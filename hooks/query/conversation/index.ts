import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../query.key";
import { conversationRequests } from "@/apis/conversations.api";

export const useGetConversations = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CONVERSATIONS],
    queryFn: async () => await conversationRequests.getAll(),
  });
};

export const useMakeNewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: any) => {
      // 메시지를 서버에 전송
      await conversationRequests.makeNew(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => console.error("에러발생: " + error),
  });
};
