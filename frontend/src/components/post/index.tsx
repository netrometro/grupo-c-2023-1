import { Image, Text, View } from "react-native";
import { Button } from "../button";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

export interface PostProps {
  id: number;
  title: string;
  description: string;
  url_image: string;
  user: string;
  likes: number;
  infor: (id: number) => void;
}

export function Post({ id, description, title, url_image, user, likes, infor }: PostProps) {
  const [fakeLikes, setFakeLikes] = useState(0)

  return (
    <Button onPress={() => infor(id)}>
      <View style={{backgroundColor: "#fff", padding: 6, marginVertical: 10, borderRadius: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>{title}</Text>
        <Image source={{ uri: url_image }} style={{ backgroundColor: "#fff", width: 256, height: 256, alignSelf: "center"}} />
        <Text style={{ fontSize: 12, textAlign: "right", fontWeight: "bold" }}>{user}</Text>
        <Text style={{ fontSize: 14, textAlign: "justify" }}>{description}</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            gap: 4
          }}
        >
          {
            fakeLikes > 0 ?
              <AntDesign
                name="heart" 
                size={24} 
                color="red"
                onPress={() => { setFakeLikes(state => state - 1) }}
              />
            :
              <AntDesign
                name="hearto" 
                size={24} 
                color="black" 
                onPress={() => { setFakeLikes(state => state + 1) }}
              />
          }
          <Text> {fakeLikes} likes</Text>
        </View>
      </View>
    </Button>
  );
}
