import { createContext, ReactNode, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store"
import React from "react";
import { Text } from "react-native";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface LoginContextData {
  isAuthenticated: boolean;
  handleLogout: () => void;
  handleLogin: () => void;
}

export const AuthContext = createContext({} as LoginContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function verifyAuth() {
    const token = await SecureStore.getItemAsync("token")

    if (token) {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    verifyAuth()
  }, []);

  async function handleLogout() {
    setIsAuthenticated(false);
    await SecureStore.deleteItemAsync("token")
  }

  async function handleLogin() {
    setIsAuthenticated(true);
  }

  if (isLoading) {
    return <Text>Carregando</Text>
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogout,
        handleLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
