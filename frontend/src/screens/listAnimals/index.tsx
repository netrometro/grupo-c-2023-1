import { FlatList } from "react-native";
import { Animal, AnimalProps } from "../../components/animal";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../api";

export function ListAnimals(props: any) {
  const [animals, setAnimals] = useState<AnimalProps[]>([]);

  function saia(id:number) {
    props.navigation.navigate("AnimalInfor", {id});
  } 

  async function findAllAnimals() {
    await api.get("/animals").then(res => setAnimals(res.data.animals.animals))
  }

  useEffect(() => {
    findAllAnimals()
  }, []);

  return (
    <>
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
