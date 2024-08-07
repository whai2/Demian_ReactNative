import client from '@/apis/axios';
import { SignInFormValues, SignUpFormValues } from './types/auth.type';

export const authRequests = Object.freeze({
  signIn: async (body: SignInFormValues) => {
    const { data } = await client.post("/auth/login", body);
    return data;
  },

  signUp: async (body: SignUpFormValues) => {
    const { data } = await client.post("/auth/signup", body);
    return data;
  },

  deleteAccount: async () => {
    await client.delete("/auth");
  }
});