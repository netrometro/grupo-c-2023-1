import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import React from "react";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar 
        barStyle={"light-content"}
      />        
      <Routes />
    </NavigationContainer>
  );
}
