import { create } from 'zustand';

interface AuthType {
  isLoggedIn: boolean;
  userToken: string;
  login: (userToken: string) => void;
  logout: () => void;
}

const useAuth = create<AuthType>((set) => ({
  isLoggedIn: false,
  userToken: "",
  login: (userToken: string) => set({ isLoggedIn: true, userToken: userToken }),
  logout: () => set({ isLoggedIn: false, userToken: "" }),
}));


export default useAuth;
