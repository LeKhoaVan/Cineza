import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
// import { Feather, FontAwesome5 } from "@expo/vector-icons";
import iconMail from '../../assets/imageButton/iconEmail.png';
import iconKeyboard from '../../assets/imageButton/iconKeyboard.png';
// import { Ionicons } from "@expo/vector-icons";
import styles from './Style_Login';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';
import config from '../../config/configAPI';

function Login() {
  //Navigation
  const navigation = useNavigation();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const user = await axios.get(`http://${config.IPP4}:9000/cineza/api/v1/user/login/${email}/${password}`);
    if (user.data != null) {
      await AsyncStorage.setItem('userInfo', JSON.stringify({ codeUser: user.data.code, userName: user.data.fullName, numberPhone: user.data.numberPhone }));
      navigation.navigate("Home")
    }

  }

  const hanldPressRegister = () => {
    navigation.navigate('Đăng ký');
  };
  const hanldPressForget = () => {
    navigation.navigate('Quên mật khẩu');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
          Vui lòng nhập Email và mật khẩu {'\n'} để đăng nhập
        </Text>
      </View>
      <View style={styles.containerInput}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1,
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 20,
            backgroundColor: '#DCDCDC',
            alignItems: 'center',
          }}>
          <View style={{ flex: 0.15, alignItems: 'center' }}>
            {/* <Feather name="mail" size={32} color="black" /> */}
            <Image source={iconMail} style={{ width: 27, height: 27 }} />
          </View>
          <TextInput
            placeholder="Vui lòng nhập Email"
            style={{ marginRight: 15, height: 50, fontSize: 22, flex: 0.85 }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: '#DCDCDC',
            alignItems: 'center',
          }}>
          <View style={{ flex: 0.15, alignItems: 'center' }}>
            {/* <FontAwesome5 name="keyboard" size={24} color="black" /> */}

            <Image source={iconKeyboard} style={{ width: 20, height: 20 }} />
          </View>
          <TextInput
            placeholder="Vui lòng nhập mật khẩu"
            style={{ height: 50, fontSize: 22, flex: 0.7 }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.15,
            }}></TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity style={styles.bottom}
          onPress={handleLogin}>
          <Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold' }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity
          style={{ margin: 15, marginTop: 25, marginRight: 25 }}
          onPress={hanldPressForget}>
          <Text style={{ fontSize: 20, color: '#940a11', fontWeight: 'bold' }}>
            Quên mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.15,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}></View>
      <View
        style={{
          flex: 0.15,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text style={{ fontSize: 20 }}>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={hanldPressRegister}>
          <Text style={{ fontSize: 22, color: '#F4A460', fontWeight: 'bold' }}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
