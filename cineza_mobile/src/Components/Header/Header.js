import React from 'react';
import styles from './Style_Header';
import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { Entypo } from 'react-native-vector-icons';
import iconMenu from '../../assets/imageButton/iconMenu.png';
import iconUser from '../../assets/imageButton/iconUser.png';
// import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from '@react-navigation/native';

function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Thành viên')}
        style={styles.containerUser}>
        <Image source={iconUser} style={{ width: 20, height: 20, tintColor: "white", left: 4 }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerLogo}>
        <Text style={{ color: "white" }}>Cineza App</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Menu')}
        style={styles.containerIcon}>
        <Image source={iconMenu} style={{ width: 20, height: 20, tintColor: "white" }} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
