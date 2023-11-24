import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Style_Register";
import { useNavigation } from "@react-navigation/native";

function Register() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Trigger form validation when name,
    // email, or password changes
    validateForm();
  }, [name, email, phone, password, passwordAgain]);

  const validateForm = () => {
    let errors = {};

    // Validate tên
    if (!name) {
      errors.name = "Tên không được để trống";
    }

    // Validate email
    if (!email) {
      errors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email không đúng";
    }

    // Validate số điện thoại
    if (!phone) {
      errors.phone = "Số điện thoại không được để trống";
    } else if (phone.length < 10) {
      errors.phone = "Số điện thoại không đúng";
    }

    // Validate mật khẩu
    if (!password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (password.length < 8) {
      errors.password = "Mật khẩu ít nhất phải 8 ký tự";
    }

    // Validate nhập lại mật khẩu
    if (!passwordAgain) {
      errors.passwordAgain = "";
    } else if (password != passwordAgain) {
      errors.passwordAgain = "Mật khẩu không giống với mật khẩu ở trên";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleRegister = () => {
    if (isFormValid) {
      // Form is valid, perform the submission logic
      console.log("Form submitted successfully!");
    } else {
      // Form is invalid, display error messages
      console.log("Form has errors. Please correct them.");
    }
  };

  const hanldPressLogin = () => {
    navigation.navigate("Đăng nhập");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
            Vui lòng nhập Email và mật khẩu {"\n"} để đăng ký tài khoản
          </Text>
        </View>
        <View style={styles.containerInput}>
          <View style={styles.item}>
            <TextInput
              placeholder="Vui lòng nhập tên"
              style={styles.textInput}
              value={name}
              onChangeText={setName}
            />
          </View>
          <Text style={styles.error}>{errors.name}</Text>
          <View style={styles.item}>
            <TextInput
              placeholder="Vui lòng nhập số điện thoại"
              style={styles.textInput}
            />
          </View>
          <Text style={styles.error}>{errors.phone}</Text>
          <View style={styles.item}>
            <TextInput
              placeholder="Vui lòng nhập Email"
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <Text style={styles.error}>{errors.email}</Text>
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
            disabled={!isFormValid}
            onPress={handleRegister}
          >
            <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerBottom}>
          <Text style={{ fontSize: 20 }}>Đã có tài khoản?</Text>
          <TouchableOpacity onPress={hanldPressLogin}>
            <Text style={{ fontSize: 22, color: "#F4A460", fontWeight: "bold" }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Register;
