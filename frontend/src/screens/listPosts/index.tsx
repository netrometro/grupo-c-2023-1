import { FlatList, TextInput, View } from "react-native";
import { Post, PostProps } from "../../components/post";
import { useEffect, useState } from "react";
import { api } from "../../api";
import { ScreenHeader } from "../../components/screen-header";
import { Entypo } from '@expo/vector-icons';

export function ListPosts(props: any) {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [search, setSearch] = useState<string>("");

  function saia(id: number) {
    props.navigation.navigate("PostInfor", { id });
  }

//   function navigateToCreateAnimal() {
//     props.navigation.navigate("PostInfor", { setPosts, saia });
//   }

  async function findAllposts() {
    await api
      .get("v1/posts")
      .then((res) => setPosts(res.data.posts));
  }

  async function findBytitle(search: string) {
    await api
      .get(`v1/posts/search?title=${search}`)
      .then((res) =>  setPosts(res.data.posts));
  }

  useEffect(() => {
    if (search === ""){
    findAllposts();
    } else {
        findBytitle(search);
    }
  }, [search]);

  return (
    <View
      style={{
        flex: 1
      }}
    >
      {/* <TouchableOpacity
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
          justifyContent: "center",
        }}
        onPress={navigateToCreateAnimal}
      >
        <AntDesign name="plus" size={32} color="black" />
      </TouchableOpacity> */}
      <ScreenHeader 
        text="Águas Blog"
        leftIcon={{
          icon: <Entypo name="menu" size={36} color="black" style={{ width: 30 }} />,
          action: () => {}
        }}
      />
      <FlatList
        style={{
          backgroundColor: "#0984E3",
          paddingHorizontal: 40
        }}
        data={posts}
        renderItem={({ index, item }) => (
          <Post key={index} {...item} infor={saia}
          />
        )}
      />
      <TextInput
        style={{ width: "90%", backgroundColor: "#fff", color: "#000", borderRadius: 16, padding: 12 }}
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar"
      />
    </View>
  );
}
