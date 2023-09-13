import { createContext, ReactNode, useState } from "react";
import React from "react";

interface UserContextProviderProps {
  children: ReactNode;
}

interface UserContextData {
  username: string
  point: number
  setPoint: (point: number) => void
  setUsername: (username: string) => void
}

export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [username, setUsername] = useState<string>("")
  const [point, setPoint] = useState<number>(0)

  return (
    <UserContext.Provider
      value={{
        point,
        setPoint,
        username,
        setUsername
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
