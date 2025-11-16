import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserContextValue {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);
