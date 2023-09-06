import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListAnimals } from "./screens/listAnimals";
import CreateAnimal from "./screens/createAnimal";
import { AnimalInfor } from "./screens/animalInfor";
import { ListPosts } from "./screens/listPosts";
import { PostInfor } from "./screens/postInfor";


type RootParam = {
    CreateAnimal: undefined;
    Animais: undefined;
    AnimalInfor: { id: number };
    ListPosts: undefined;
    PostInfor: { id: number };
}


export function Routes() {
    const {Group, Navigator, Screen} = createNativeStackNavigator<RootParam>();

    // teste

  return (
    <Navigator initialRouteName="ListPosts">
      <Screen name="ListPosts" component={ListPosts} />
      <Screen name="PostInfor" component={PostInfor} /> 
      <Screen name="Animais" component={ListAnimals} />
      <Screen name="CreateAnimal" component={CreateAnimal} />
      <Screen name="AnimalInfor" component={AnimalInfor} /> 
    </Navigator>
  );
}
