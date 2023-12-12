import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import config from "../../config/configAPI";

const data = [
  {
    key: "Vé thường",
    urlImg:
      "https://evoseating.com.vn/wp-content/uploads/2022/11/evo-5605vn-1.jpg",
  },
  {
    key: "Vé VIP",
    urlImg:
      "https://cdn.alongwalker.info/img/2020/8/7/3dca380686bd347c9dcc91b322d2e612.jpg",
  },
];

const AnotherShow = () => {
  const navigation = useNavigation();
  const handleClick = (item) => {

    if (item.key == "Vé thường") {
      navigation.navigate("Vé Thường");
    } else if (item.key == "Vé VIP") {
      navigation.navigate("Vé VIP")
    }
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <TouchableOpacity onPress={() => handleClick(item)}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    marginBottom: 5,
                    borderRadius: 50,
                  }}
                  source={{ uri: item.urlImg }}
                ></Image>
                <Text style={{ textAlign: "center", color: "white" }}>{item.key}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>

  );
};


const styles = StyleSheet.create({
  container: {

  },
  item: {
    padding: 20,
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 190,
    color: "white",
  },
});

export default AnotherShow;
