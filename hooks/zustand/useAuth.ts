import { create } from 'zustand';

interface AuthType {
  isLoggedIn: boolean;
  userId: string;
  login: () => void;
  logout: () => void;
  setUserId: (userId: string) => void;
}

const useAuth = create<AuthType>((set) => ({
  isLoggedIn: false,
  userId: "",
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  setUserId: (userId: string) => set({ userId: userId }),
}));

export default useAuth;
