import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

function ChangePassword() {
  const [isPassword, setIsPassword] = useState(true);
  const hanldPressPass = () => {
    if (isPassword) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#d1d1cf" }}>
      <Text style={styles.title}>MẬT KHẨU ĐĂNG NHẬP</Text>
      <View style={styles.item}>
        <TextInput
          secureTextEntry={isPassword}
          placeholder="Mật khẩu hiện tại"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={hanldPressPass}
        >
          {isPassword ? (
            <Entypo name="eye-with-line" size={24} color="black" />
          ) : (
            <Entypo name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TextInput
          secureTextEntry={isPassword}
          placeholder="Mật khẩu mới"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={hanldPressPass}
        >
          {isPassword ? (
            <Entypo name="eye-with-line" size={24} color="black" />
          ) : (
            <Entypo name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TextInput
          secureTextEntry={isPassword}
          placeholder="Nhập lại mật khẩu"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={hanldPressPass}
        >
          {isPassword ? (
            <Entypo name="eye-with-line" size={24} color="black" />
          ) : (
            <Entypo name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <Text style={{ textAlign: "center", fontSize: 22, color: "#fff" }}>
          Đổi mật khẩu
        </Text>
      </View>
    </View>
  );
}

export default ChangePassword;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginLeft: 5,
    paddingVertical: 20,
    paddingTop: 30,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1cf",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  button: {
    paddingVertical: 10,
    marginTop: 30,
    backgroundColor: "red",
    width: 270,
    borderRadius: 50,
    marginLeft: 50,
  },
  textInput: { height: 40, fontSize: 20, marginLeft: 10 },
});
