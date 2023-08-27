import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { Button } from "../button";

export interface AnimalProps {
  id: number;
  name: string;
  specie_name: string;
  size: number;
  convervation_status: ConservationStatus;
  url_image: string;
  infor: (id: number) => void;
}

const ConservationStatusColor = {
  EXTINCT: "#ff0000",
  EXTINCT_IN_THE_WILD: "#ff0000",
  CRITICAL_ENDANGERED: "#ff0000",
  ENDANGERED: "#ff0000",
  VULNERABLE: "#ff0000",
  NEAR_THREATENED: "#ff0000",
  LEAST_CONCERN: "#ff0000",
  DATA_DEFICIENT: "#ff0000",
  NOT_AVALUATED: "#ff0000"
}

export function Animal({
  id,
  name,
  specie_name,
  size,
  convervation_status,
  url_image,
  infor,
}: AnimalProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: url_image }} style={styles.animalImage} />
      <View style={styles.content}>
        <Text>{name}</Text>
        <Text>{specie_name}</Text>
        <Text>{size}</Text>
        <View
          style={{
            backgroundColor: ConservationStatusColor[convervation_status],
            ...styles.conservationContainer,
          }}
        >
          <Text>{convervation_status}</Text>
        </View>
        <Button style={styles.knowMore} onPress={() => infor(id)}>
          <Text>saiba mais...</Text>
        </Button>
      </View>
    </View>
  );
}
