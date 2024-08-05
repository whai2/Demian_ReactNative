import { create } from 'zustand';

interface AuthType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const useAuth = create<AuthType>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuth;
