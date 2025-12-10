import { createContext } from "react";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  invitationList: Invitation[] | [];
  email: string;
  createdAt: string;
}

export interface Invitation {
  listId: string;
  invitedBy: string;
  invitedAt: string;
}

export interface UserContextValue {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);
