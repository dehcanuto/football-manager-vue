import { defineStore } from "pinia";

import { authService } from "@/services/auth";
import type { AuthState, AuthValues, LoginResponse } from "@/models/auth";

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
    async login(credentials: AuthValues) {
      this.isLoading = true;
      try {
        const { data } = await authService.login(credentials) as { data: LoginResponse };
        const userInfo = JSON.stringify(data.user);

        this.user = userInfo;
        this.token = data.access_token;

        localStorage.setItem("@dugout/user", userInfo);
        localStorage.setItem("@dugout/token", data.access_token);

        return data.access_token;
      } catch (error) {
        console.error('login error', error)
        throw new Error(`${error}`);
      } finally {
        this.isLoading = false;
      }
    },
    async checkAuth() {
      this.isLoading = true;
      try {
        if (!this.token) throw new Error("No token found");

        const { data } = await authService.fetchUser();
        const userInfo = JSON.stringify(data.user);

        this.user = userInfo;
        localStorage.setItem("@dugout/user", userInfo);

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
