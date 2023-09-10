import { FlatList, TextInput, View, Text } from "react-native";
import { Post, PostProps } from "../../components/post";
import { useEffect, useState } from "react";
import { api } from "../../api";
import { ScreenHeader } from "../../components/screen-header";
import { Entypo } from '@expo/vector-icons';
import React from "react";
import { DrawerProvider } from "../../components/drawer-menu";

export function ListPosts(props: any) {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isOpenLeftMenu, setIsOpenLeftMenu] = React.useState(false);

  useEffect(() => {
    if (search === ""){
    findAllposts();
    } else {
        findBytitle(search);
    }
  }, [search]);

  function openLeftMenu() {
    setIsOpenLeftMenu(true)
  }

  function saia(id: number) {
    props.navigation.navigate("PostInfor", { id });
  }

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

  return (
    <DrawerProvider
      open={isOpenLeftMenu}
      setOpen={setIsOpenLeftMenu}
      navigate={props.navigation.navigate}
      screen="Blog"
    >
      <View
      style={{
        flex: 1
      }}
      >
        <ScreenHeader 
          text="Águas Blog"
          leftIcon={{
            icon: <Entypo name="menu" size={36} color="black" style={{ width: 30 }} />,
            action: () => { openLeftMenu() }
          }}
        />
        <FlatList
          style={{
            backgroundColor: "#0984E3",
            paddingHorizontal: 40
          }}
          data={posts}
          renderItem={({ index, item }) => (
            <Post 
              key={index} 
              {...item} 
              infor={saia}
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
    </DrawerProvider>
  );
}
