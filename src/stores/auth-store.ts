import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginCredentials } from "@/types/auth";
import apiClient from "@/lib/api/axios";


interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          //   const response = await apiClient.post("/auth/login", credentials);
          //   const { user, token } = response.data;
          const { email } = credentials;
          const user = {
            id: "usr_123456789",
            email: email, 
            avatar:"/favicon.ico",
            name: "Bang Fauzan",
            role: "admin" as const,
            phone: "081234567890",
            is_active: true,
            created_at: "2024-01-15T08:30:00.000Z",
            updated_at: "2024-11-20T14:45:00.000Z",
            last_login_at: new Date().toISOString(), 
          };

          const token = "dummy_jwt_token_" + Date.now();

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const response = await apiClient.get("/auth/me");
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
