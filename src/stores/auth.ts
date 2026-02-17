import { defineStore } from "pinia";

import { authService } from "@/services/auth";
import type { AuthState } from "@/models/auth";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: localStorage.getItem("@dugout/user") || null,
    token: localStorage.getItem("@dugout/token") || null,
    isLoading: false,
  }),
  getters: {
    isAuthenticated: (state: AuthState) => !!state.token,
    getMe: (state: AuthState) => state.user && JSON.parse(state.user),
  },
  actions: {
    async login(credentials: { email: string; password: string }) {
      this.isLoading = true;
      try {
        const { data } = await authService.login(credentials);
        const userInfo = JSON.stringify(data.user);

        this.user = userInfo;
        this.token = data.token.accessToken;

        localStorage.setItem("@dugout/user", userInfo);
        localStorage.setItem("@dugout/token", data.token.accessToken);

        return data.token.accessToken;
      } catch (error) {
        throw new Error(`${error}`);
      } finally {
        this.isLoading = false;
      }
    },
    async checkAuth() {
      this.isLoading = true;
      try {
        if (!this.token) throw new Error("No token found");
        await authService.fetchUser();
        return true;
      } catch (error) {
        this.logout();
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("@dugout/user");
      localStorage.removeItem("@dugout/token");
    },
  },
});
