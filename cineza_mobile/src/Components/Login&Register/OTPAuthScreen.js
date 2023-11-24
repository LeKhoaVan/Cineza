import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';

const OTPAuthScreen = ({ route }) => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');

  const email = route.params.email;
  const name = route.params.name;
  const password = route.params.password;

  const handleVerifyOTP = async () => {
    try {
      const resultData = await axios.post(`http://${config.IPP4}:9000/cineza/api/v1/user/verify-otp`,
        { email: email, otp: otp })
      if (resultData.data) {
        //   {
        //     "code" : "user01",
        //     "type" : "USER",
        //     "fullName" : "Văn",
        //     "numberPhone" : "0123456589",
        //     "password" : "one32343",
        //     "dateOfBirth" : "2023-09-23",
        //     "countryAddress" : "qg02",
        //     "cityAddress": "tp01", 
        //     "districtAddress" : "qh01", 
        //     "wardAddress" : "xp01", 
        //     "numberHome": "256 Dương Quảng Hàm",
        //     "status" : "Hoạt động"
        // }
        const newUser = await axios.post(`http://${config.IPP4}:9000/cineza/api/v1/user/create`,
          {
            "type": "USER",
            "fullName": name,
            "numberPhone": email,
            "password": password,
            "dateOfBirth": "2023-09-23",
            "numberHome": "256 Dương Quảng Hàm",
            "status": "Hoạt động"
          })
        if (newUser.status === 201) {
          await AsyncStorage.setItem('userInfo', JSON.stringify({ codeUser: newUser.data.code, userName: newUser.data.fullName }));
          navigation.navigate("Home")
        }

      }
    } catch (error) {
      console.log("error verify otp: " + error);
    }
    console.log('Xác thực mã OTP:', otp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác Thực Mã OTP</Text>
      <Text style={styles.description}>Nhập mã OTP đã được gửi đến địa chỉ mail của bạn</Text>
      <TextInput
        style={styles.otpInput}
        placeholder="Nhập mã OTP"
        value={otp}
        onChangeText={(text) => setOtp(text)}
        keyboardType="numeric"
        maxLength={6}
      />
      <Button title="Xác Thực" onPress={handleVerifyOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpInput: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OTPAuthScreen;