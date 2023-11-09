import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function ForgetPassword() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Trigger form validation when name,
    // email, or password changes
    validateForm();
  }, [email]);

  const validateForm = () => {
    let errors = {};

    // Validate email
    if (!email) {
      errors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email không đúng";
    }
    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const hanldPressModify = () => {
    navigation.navigate("Đổi mật khẩu");
  };
  const hanldPressLogin = () => {
    navigation.navigate("Đăng nhập");
  };
  const hanldPressRegister = () => {
    navigation.navigate("Đăng ký");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
          Vui lòng nhập Email để {"\n"} quên mật khẩu
        </Text>
      </View>
      <View style={styles.containerInput}>
        <View style={styles.item}>
          <TextInput
            placeholder="Vui lòng nhập Email"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <View style={styles.btnRegister}>
        <TouchableOpacity
          style={styles.bottom}
          // disabled={!isFormValid}
          onPress={hanldPressModify}
        >
          <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity onPress={hanldPressLogin}>
          <Text style={{ fontSize: 22, color: "#F4A460", fontWeight: "bold" }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity onPress={hanldPressRegister}>
          <Text style={{ fontSize: 22, color: "#F4A460", fontWeight: "bold" }}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerText: {
    height: 100,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  containerInput: {
    // flex: 0.4,
    marginTop: 30,
  },
  item: {
    // display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#DCDCDC",
    alignItems: "center",
  },
  textInput: {
    marginLeft: 15,
    height: 50,
    fontSize: 22,
    // flex: 0.85,
  },
  containerBottom: {
    // flex: 0.3,
    justifyContent: "flex-end",
    // alignItems: "center",
    marginRight: 30,
    // display: "flex",
    flexDirection: "row",
  },
  btnRegister: {
    // display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    // paddingRight: 10,
    marginTop: 20,
  },
  bottom: {
    // flex: 1,
    width: "90%",
    height: 60,
    backgroundColor: "#940a11",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  error: {
    color: "red",
    fontSize: 20,
    marginLeft: 10,
  },
});
