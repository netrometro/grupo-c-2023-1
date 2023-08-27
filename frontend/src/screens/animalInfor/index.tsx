import { View, Image, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import { Button } from "../../components/button";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../api";

export function AnimalInfor(props: any) {
  const id = props.route.params.id;
  const [name, setName] = useState("");
  const [specieName, setSpecieName] = useState("");
  const [size, setSize] = useState(0);
  const [conservation, setConservation] =
    useState<ConservationStatus>("NOT_AVALUATED");
  const [ecologicalFunction, setEcologicalFunction] = useState("bhgdhgsdoyih");
  const [urlImage, setUrlImage] = useState();
  // const [threatCauses, setThreatCauses] = useState();

  async function getAnimal() {
    await api.get(`/animals/${id}`).then((response) => {
      setName(response.data.animal.name);
      setSize(response.data.animal.size);
      setSpecieName(response.data.animal.specie_name);
      setConservation(response.data.animal.conservation_status);
      setEcologicalFunction(response.data.animal.ecological_function);
      setUrlImage(response.data.animal.url_image);
    });
  }

  useEffect(() => {
    getAnimal();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.imageAnimal} source={{ uri: urlImage }} />
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{specieName}</Text>
        <Text style={styles.text}>{size}</Text>

        <Picker
          style={styles.select}
          selectedValue={conservation}
          enabled={false}
        >
          <Picker.Item label="Extinto" value={"EXTINCT"} />
          <Picker.Item label="Extinto na Selva" value={"EXTINCT_IN_THE_WILD"} />
          <Picker.Item label="Perigo" value={"CRITICAL_ENDANGERED"} />
          <Picker.Item label="Ameaçado" value={"ENDANGERED"} />
          <Picker.Item label="Vulnerável" value={"VULNERABLE"} />
          <Picker.Item label="Quase Ameaçado" value={"NEAR_THREATENED"} />
          <Picker.Item label="Menor Precupação" value={"LEAST_CONCERN"} />
          <Picker.Item label="Dados Deficientes" value={"DATA_DEFICIENT"} />
          <Picker.Item label="Não Avaliado" value={"NOT_AVALUATED"} />
        </Picker>

        <Text
          style={{ textAlignVertical: "top", ...styles.text }}
        >
          {ecologicalFunction}
        </Text>
      </View>
    </ScrollView>
  );
}
