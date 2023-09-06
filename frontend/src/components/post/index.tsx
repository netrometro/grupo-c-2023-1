import { Image, Text, View } from "react-native";
import { Button } from "../button";

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
  return (
    <Button onPress={() => infor(id)}>
      <View style={{backgroundColor: "#fff", padding: 6, marginVertical: 10, borderRadius: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>{title}</Text>
        <Image source={{ uri: url_image }} style={{ backgroundColor: "#fff", width: 256, height: 256, alignSelf: "center"}} />
        <Text style={{ fontSize: 12, textAlign: "right", fontWeight: "bold" }}>{user}</Text>
        <Text style={{ fontSize: 14, textAlign: "justify" }}>{description}</Text>
        <Text> {likes} likes</Text>
      </View>
    </Button>
  );
}
