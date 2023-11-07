import React, { useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

function ProfileDetail() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.content}>
        <Text style={{ fontSize: 18, paddingLeft: 5, color: "#8c8f67" }}>
          Tài khoản Email
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 600, paddingLeft: 5 }}>
          toduchieu1245@gmail.com
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={{ fontSize: 18, paddingLeft: 5, color: "#8c8f67" }}>
          Thông tin thêm
        </Text>
      </View>
      <View style={{}}>
        <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.viewText}>Họ tên</Text>
            <TextInput
              style={{ fontSize: 18, paddingRight: 15 }}
              value="Tô Đức Hiếu"
            ></TextInput>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.viewText}>Ngày sinh</Text>
            <TextInput
              style={{ fontSize: 18, paddingRight: 15 }}
              value="20/10/2001"
            ></TextInput>
          </View>
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={{ fontSize: 18, paddingLeft: 5, color: "#8c8f67" }}>
            Liên hệ
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.viewText}>Số điện thoại</Text>
            <TextInput
              style={{ fontSize: 18, paddingRight: 15 }}
              value="0372460109"
            ></TextInput>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.viewText}>Tỉnh/thành</Text>
            <Text style={{ fontSize: 18, paddingRight: 15 }}>Hồ Chí Minh</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.bottom}>
          <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
            Cập nhật thông tin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfileDetail;

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
  content: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#d1d1cf",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1cf",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  viewText: {
    fontSize: 18,
    paddingLeft: 15,
  },
  bottom: {
    height: 50,
    backgroundColor: "#940a11",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 50,
  },
});
