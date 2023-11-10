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

function ModifyPassword() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [password, passwordAgain]);

  const validateForm = () => {
    let errors = {};

    // Validate mật khẩu
    if (!password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (password.length < 8) {
      errors.password = "Mật khẩu ít nhất phải 8 ký tự";
    }

    // Validate nhập lại mật khẩu
    if (!passwordAgain) {
      errors.passwordAgain = "Không để trống";
    } else if (password != passwordAgain) {
      errors.passwordAgain = "Mật khẩu không giống với mật khẩu ở trên";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const hanldPressModify = () => {
    navigation.navigate("Đăng nhập");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
          Vui lòng nhập mật khẩu mới {"\n"}để thay đổi
        </Text>
      </View>
      <View style={styles.containerInput}>
        <View style={styles.item}>
          <TextInput
            placeholder="Vui lòng nhập mật khẩu"
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Text style={styles.error}>{errors.password}</Text>
        <View style={styles.item}>
          <TextInput
            placeholder="Vui lòng nhập lại mật khẩu"
            style={styles.textInput}
            value={passwordAgain}
            onChangeText={setPasswordAgain}
          />
        </View>
        <Text style={styles.error}>{errors.passwordAgain}</Text>
      </View>

      <View style={styles.btnRegister}>
        <TouchableOpacity
          style={styles.bottom}
          // disabled={!isFormValid}
          onPress={hanldPressModify}
        >
          <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
            Đổi mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.containerBottom}>
        <Text style={{ fontSize: 20 }}>Đã có tài khoản?</Text>
        <TouchableOpacity onPress={hanldPressLogin}>
          <Text style={{ fontSize: 22, color: "#F4A460", fontWeight: "bold" }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.error}>
          {error}
        </Text>
      ))} */}
    </View>
  );
}

export default ModifyPassword;

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
    justifyContent: "center",
    alignItems: "center",
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
