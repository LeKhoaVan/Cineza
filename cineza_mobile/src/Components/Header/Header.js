import React from 'react';
import styles from './Style_Header';
import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { Entypo } from 'react-native-vector-icons';
import iconMenu from "../../assets/imageButton/iconMenu.png";
// import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from '@react-navigation/native';

function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Thành viên')}
        style={styles.containerUser}>
        {/* <FontAwesome5 name="user-tie" size={24} color="white" /> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerLogo}>
        <Text>Cineza App</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Menu')}
        style={styles.containerIcon}>
        {/* <Entypo name="menu" size={25} color="black" /> */}
        <Image source={iconMenu} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
