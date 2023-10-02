import { create } from 'zustand';
import { User } from '../../types';

interface AuthState {
  auth: null | User;
  setAuth: (auth: User) => void;
  removeAuth: () => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  auth: null,
  setAuth: (auth) => set(() => ({ auth })),
  removeAuth: () => set({ auth: null }),
}));
