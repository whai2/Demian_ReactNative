import client from "@/apis/axios";

export const conversationRequests = Object.freeze({
  getAll: async () => {
    const { data } = await client.get("/conversations");
    return data;
  },

  makeNew: async (formData: any) => {
    try {
      console.log(formData);
      const { data } = await client.post("/conversations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error making request:', error);
      throw error;
    }
  }
});
