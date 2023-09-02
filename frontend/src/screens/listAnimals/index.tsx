import { FlatList, Text, TouchableOpacity } from "react-native";
import { Animal, AnimalProps } from "../../components/animal";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../api";
import { AntDesign } from '@expo/vector-icons';

export function ListAnimals(props: any) {
  const [animals, setAnimals] = useState<AnimalProps[]>([]);

  function saia(id:number) {
    props.navigation.navigate("AnimalInfor", {id});
  } 

  function navigateToCreateAnimal() {
    props.navigation.navigate("CreateAnimal");
  }

  async function findAllAnimals() {
    await api.get("v1/animals").then(res => setAnimals(res.data.animals.animals))
  }

  useEffect(() => {
    findAllAnimals()
  }, []);

  return (
    <>
      <TouchableOpacity
        style={{
          position: "absolute",
          left: "80%",
          bottom: "10%",
          backgroundColor: "red",
          zIndex: 1000,
          borderRadius: 50,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center"
        }}

        onPress={navigateToCreateAnimal}
      >
        <AntDesign name="plus" size={32} color="black" />
      </TouchableOpacity>
      <FlatList
        style={styles.container}
        data={animals}
        renderItem={({ index, item }) => (
          <Animal
            key={index}
            id={item.id}
            name={item.name}
            specie_name={item.specie_name}
            convervation_status={item.convervation_status as ConservationStatus}
            size={item.size}
            url_image={item.url_image}
            infor={saia}
          />
        )}
      />
    </>
  );
}
