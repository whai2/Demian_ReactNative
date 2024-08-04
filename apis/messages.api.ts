import client from '@/apis/axios';
import { MessageType } from '@/apis/types/messages.type';

export const messages = Object.freeze({
  sendByConversationId: async (body: MessageType, conversationId: string) => {
    const { data } = await client.post(`/${conversationId}/send`, body);
    return data;
  },

  getByConversationId: async (conversationId: string, page: number) => {
    const { data } = await client.get(`/${conversationId}`, {
      params: {
        page: page
      }
    });
    return data;
  },
});