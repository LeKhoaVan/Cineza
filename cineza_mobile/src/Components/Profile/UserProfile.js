import React, { useState } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
// import { AntDesign } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";

function UserProfile() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View style={{ width: 150, height: 150, borderRadius: 80 }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150, borderRadius: 80 }}
            />
          )}
        </View>
        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={pickImage} style={styles.iconCamera}>
            <AntDesign name="camera" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Tô Đức Hiếu</Text>
        </View>
      </View>
      <View style={{ padding: 20, backgroundColor: "#d1d1cf" }} />
      <View style={{}}>
        <View style={styles.item}>
          <Entypo name="v-card" size={30} color="black" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Thông tin tài khoản")}
          >
            <Text style={{ fontSize: 18, paddingLeft: 10 }}>
              Thông tin tài khoản
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <FontAwesome5 name="unlock-alt" size={30} color="black" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Thay đổi mật khẩu")}
          >
            <Text style={{ fontSize: 18, paddingLeft: 15 }}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 20, backgroundColor: "#d1d1cf" }} />
        <View style={styles.item}>
          <FontAwesome name="history" size={30} color="black" />
          <TouchableOpacity onPress={() => navigation.navigate("Lịch sử vé")}>
            <Text style={{ fontSize: 18, paddingLeft: 15 }}>
              Lịch sử giao dịch
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default UserProfile;

const styles = StyleSheet.create({
  iconCamera: {
    position: "absolute",
    top: -30,
    right: -70,
    backgroundColor: "#fff",
    borderRadius: 80,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1cf",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
});
