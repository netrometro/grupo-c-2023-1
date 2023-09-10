import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListAnimals } from "./screens/listAnimals";
import CreateAnimal from "./screens/createAnimal";
import { AnimalInfor } from "./screens/animalInfor";
import { ListPosts } from "./screens/listPosts";
import { PostInfor } from "./screens/postInfor";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Login } from "./screens/login";


type RootParam = {
  Login: undefined;
  CreateAnimal: undefined;
  Animais: undefined;
  AnimalInfor: { id: number };
  ListPosts: undefined;
  PostInfor: { id: number };
}

export function Routes() {
  const { Navigator, Screen, Group } = createNativeStackNavigator<RootParam>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  async function checkIfAuthenticated() {
    const token = await SecureStore.getItemAsync("token");
    setIsAuthenticated(!!token);
    console.log(isAuthenticated);
  }

  useEffect(() => {
    // SecureStore.deleteItemAsync("token");
    checkIfAuthenticated();
  }, [])

  return (
    <Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
    {isAuthenticated?
    <>

    <Screen name="ListPosts" component={ListPosts} />
    <Screen name="PostInfor" component={PostInfor} /> 
    <Screen name="Animais" component={ListAnimals} />
    <Screen name="CreateAnimal" component={CreateAnimal} />
    <Screen name="AnimalInfor" component={AnimalInfor} />
    </>: <Screen name="Login" component={Login} navigationKey="" /> }
    </Navigator>
  );
}
