import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Style_Login";
import { useNavigation } from "@react-navigation/native";

function Login() {
  //Navigation
  const navigation = useNavigation();
  const hanldPressRegister = () => {
    navigation.navigate("Đăng ký");
  };
  const hanldPressForget = () => {
    navigation.navigate("Quên mật khẩu");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={{ fontSize: 20, color: "#fff", textAlign: "center" }}>
          Vui lòng nhập Email và mật khẩu {"\n"} để đăng nhập
        </Text>
      </View>
      <View style={styles.containerInput}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 20,
            backgroundColor: "#DCDCDC",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.15, alignItems: "center" }}>
            <Feather name="mail" size={32} color="black" />
          </View>
          <TextInput
            placeholder="Vui lòng nhập Email"
            style={{ marginRight: 15, height: 50, fontSize: 22, flex: 0.85 }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: "#DCDCDC",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.15, alignItems: "center" }}>
            <FontAwesome5 name="keyboard" size={24} color="black" />
          </View>
          <TextInput
            placeholder="Vui lòng nhập mật khẩu"
            style={{ height: 50, fontSize: 22, flex: 0.7 }}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 0.15,
            }}
          ></TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity style={styles.bottom}>
          <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity
          style={{ margin: 15, marginTop: 25, marginRight: 25 }}
          onPress={hanldPressForget}
        >
          <Text style={{ fontSize: 20, color: "#940a11", fontWeight: "bold" }}>
            Quên mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.15,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      ></View>
      <View
        style={{
          flex: 0.15,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 20 }}>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={hanldPressRegister}>
          <Text style={{ fontSize: 22, color: "#F4A460", fontWeight: "bold" }}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
