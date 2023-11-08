import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    key: "4DX",
    urlImg:
      "https://techbike.vn/attachments/cong-nghe-chieu-phim-4dx-jpg.3149/",
  },
  {
    key: "SWEETBOX",
    urlImg:
      "https://cdn.alongwalker.info/img/2020/8/7/3dca380686bd347c9dcc91b322d2e612.jpg",
  },
];

const AnotherShow = () => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate("4DX");
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <TouchableOpacity onPress={handleClick}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    marginBottom: 5,
                    borderRadius: 50,
                  }}
                  source={{ uri: item.urlImg }}
                ></Image>
                <Text style={{ textAlign: "center" }}>{item.key}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 190,
  },
});

export default AnotherShow;
