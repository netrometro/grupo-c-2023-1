import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListAnimals } from "./screens/listAnimals";
import CreateAnimal from "./screens/createAnimal";
import { AnimalInfor } from "./screens/animalInfor";


type RootParam = {
    CreateAnimal: undefined;
    Animais: undefined;
    AnimalInfor: { id: number }
}


export function Routes() {
    const {Group, Navigator, Screen} = createNativeStackNavigator<RootParam>();
  return (
    <Navigator initialRouteName="Animais">
      <Screen name="Animais" component={ListAnimals} />
      <Screen name="CreateAnimal" component={CreateAnimal} />
      <Screen name="AnimalInfor" component={AnimalInfor} /> 
    </Navigator>
  );
}
