import client from "@/apis/axios";

export const conversationRequests = Object.freeze({
  getAll: async () => {
    const { data } = await client.get("/conversations");
    return data;
  },

  makeNew: async (formData: any) => {
    const { data } = await client.post("/conversations", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
});
