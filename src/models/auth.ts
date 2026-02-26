import { Team } from "./team";

export interface AuthState {
  user: string | null;
  token: string | null;
  isLoading: boolean;
}

export interface AuthValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    uuid: string;
    name: string;
    email: string;
    createdAt: string;
    team: Team;
  };
}
