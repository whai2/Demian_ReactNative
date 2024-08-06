import { useEffect } from 'react';
import {  useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messages } from '@/apis/messages.api';

export const useGetInfiniteMessages = (conversationId: string) => {
  return useInfiniteQuery({
    queryKey: ['messages', conversationId],
    initialPageParam: 1,
    queryFn: async ({ pageParam=1 }) => {
      return await messages.getByConversationId(conversationId, pageParam);
    },
    getNextPageParam: (lastPage: any) => {
      const total = lastPage.totalPages;
      const current = lastPage.currentPage;
      if (total > current) {
        return current + 1;
      }
    },
    select: (data) => {
      const flattenResult = data.pages
        .slice()                        // 원본 배열을 변경하지 않기 위해 복사
        .reverse()                      // pages 배열을 역순으로 정렬
        .flatMap(page => page.messages); 
      return flattenResult;
    },
  });
};

export const useSendMessage = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      // 메시지를 서버에 전송
      return await messages.sendByConversationId({ message: message }, conversationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
    },
    onError: error => console.error('에러발생: ' + error),
  });
};

export const useMessageSocket = (socket: any, conversationId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
        if (!oldData) return oldData;

        // 최신 데이터를 기반으로 상태 업데이트
        const updatedPages = oldData.pages.map((page: any, index: number) => {
          // 마지막 페이지에 새로운 메시지를 추가
          if (index === 0) {
            return {
              ...page,
              messages: [...page.messages, newMessage],
            };
          }
          return page;
        });

        return {
          ...oldData,
          pages: updatedPages,
        };
      });
    };

    socket?.on('newMessage', handleNewMessage);

    // 이벤트 리스너 제거
    return () => {
      socket?.off('newMessage', handleNewMessage);
    };
    
  }, [socket, conversationId, queryClient]);
};