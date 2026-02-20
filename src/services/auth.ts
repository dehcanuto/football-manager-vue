import { AuthValues } from "@/models/auth";
import api from "./api";

export const authService = {
  login: (credentials: AuthValues) => api.post("/auth/login", credentials),
  fetchUser: () => api.get("/auth/me"),
};
