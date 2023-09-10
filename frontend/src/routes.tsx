import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListAnimals } from "./screens/listAnimals";
import CreateAnimal from "./screens/createAnimal";
import { AnimalInfor } from "./screens/animalInfor";
import { ListPosts } from "./screens/listPosts";
import { PostInfor } from "./screens/postInfor";
import { useContext } from "react"
import { AuthContext } from "./contexts/auth"
import React from "react";
import { Login } from "./screens/login";

type RootParam = {
  CreateAnimal: undefined;
  Login: undefined;
  Animais: undefined;
  AnimalInfor: { id: number };
  ListPosts: undefined;
  PostInfor: { id: number };
}

export function Routes() {
  const { Navigator, Screen } = createNativeStackNavigator<RootParam>();
  const { isAuthenticated } = useContext(AuthContext)

  return (
    isAuthenticated ?

    <Navigator 
      initialRouteName="ListPosts"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="ListPosts" component={ListPosts} />
      <Screen name="PostInfor" component={PostInfor} /> 
      <Screen name="Animais" component={ListAnimals} />
      <Screen name="CreateAnimal" component={CreateAnimal} />
      <Screen name="AnimalInfor" component={AnimalInfor} /> 
    </Navigator>

    :

    <Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Login"component={Login} />
    </Navigator>
  );
}
