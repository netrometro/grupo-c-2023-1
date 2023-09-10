import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import React from "react";
import { StatusBar } from "react-native";
import { AuthContextProvider } from "./src/contexts/auth";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar 
          barStyle={"light-content"}
        />        
        <Routes />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
