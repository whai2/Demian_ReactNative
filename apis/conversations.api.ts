import client from "@/apis/axios";

export const conversationRequests = Object.freeze({
  getAll: async () => {
    const { data } = await client.get("/conversations");
    return data;
  },
});
