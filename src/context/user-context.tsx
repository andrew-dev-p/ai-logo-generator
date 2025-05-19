import { createContext } from "react";

export interface UserData {
  name: string;
  email: string;
  credits: number;
}

export interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
}

export const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
});
