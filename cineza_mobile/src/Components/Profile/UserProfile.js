import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import iconCamera from '../../assets/imageButton/iconCamera.png';
import iconCard from '../../assets/imageButton/iconCard.png';
import iconHistory from '../../assets/imageButton/iconHistory.png';
import iconUnlock from '../../assets/imageButton/iconUnlock.png';


function UserProfile() {
  const navigation = useNavigation();
  const [image, setImage] = useState("https://inkythuatso.com/uploads/thumbnails/800/2023/03/8-anh-dai-dien-trang-inkythuatso-03-15-26-54.jpg");
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const userInfoString = await AsyncStorage.getItem('userInfo');

      if (userInfoString !== null) {
        setUser(JSON.parse(userInfoString))
      }
    }
    getUser();
  }, [])
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
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <View style={{ width: 150, height: 150, borderRadius: 80 }}>
          {/* {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150, borderRadius: 80 }}
            />
          )} */}
          <Image
            source={{ uri: image }}
            style={{
              width: 150, height: 150, borderRadius: 80, borderColor: 'gray',
              borderWidth: 1,
            }}
          />
        </View>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={pickImage} style={styles.iconCamera}>
            {/* <AntDesign name="camera" size={24} color="gray" /> */}
            <Image source={iconCamera} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>{user == "" ? "" : user.userName}</Text>
        </View>
      </View>
      <View style={{ padding: 20, backgroundColor: '#d1d1cf' }} />
      <View style={{}}>
        <View style={styles.item}>
          {/* <Entypo name="v-card" size={30} color="black" /> */}
          <Image source={iconCard} style={{ width: 24, height: 24 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Thông tin tài khoản')}>
            <Text style={{ fontSize: 18, paddingLeft: 10 }}>
              Thông tin tài khoản
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          {/* <FontAwesome5 name="unlock-alt" size={30} color="black" /> */}
          <Image source={iconUnlock} style={{ width: 24, height: 24 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Thay đổi mật khẩu')}>
            <Text style={{ fontSize: 18, paddingLeft: 15 }}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 20, backgroundColor: '#d1d1cf' }} />
        <View style={styles.item}>
          {/* <FontAwesome name="history" size={30} color="black" /> */}
          <Image source={iconHistory} style={{ width: 24, height: 24 }} />
          <TouchableOpacity onPress={() => navigation.navigate('Lịch sử vé')}>
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
    position: 'absolute',
    top: -30,
    right: -70,
    backgroundColor: '#fff',
    borderRadius: 80,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1cf',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
});
