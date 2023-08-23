import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
// import { ListAnimals } from "./src/screens/listAnimals";
// import CreateAnimal from "./src/components/createAnimal";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          {/* <Stack.Screen name="ListAnimals" component={ListAnimals} />
          <Stack.Screen name="CreateAnimal" component={CreateAnimal} /> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
}
