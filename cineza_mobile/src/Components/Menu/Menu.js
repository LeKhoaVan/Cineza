import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Style_Menu';

import iconHome from '../../assets/imageButton/iconHome.png';
import iconHomeTheater from '../../assets/imageButton/iconHomeTheater.png';
import iconTicket from '../../assets/imageButton/iconTicket.png';

import { NavigationContainer, useNavigation } from '@react-navigation/native';

// import { Entypo } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { MaterialIcons } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
// import { Foundation } from "@expo/vector-icons";
// import { Fontisto } from "@expo/vector-icons";
// import { Octicons } from "@expo/vector-icons";
// import { FontAwesome5 } from "@expo/vector-icons";

function Menu() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Danh sách phim')}>
        <Text style={styles.bookTicket}>Đặt vé theo Phim</Text>
        <View style={styles.separator}></View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Danh sách rạp')}>
        <Text style={styles.bookTicket}>Đặt vé theo Rạp</Text>
        <View style={styles.separator}></View>
      </TouchableOpacity>

      <View style={styles.containerOptions}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Home')}>
          {/* <Entypo name="home" size={30} color="white" /> */}
          <Image source={iconHome} style={{ width: 45, height: 45, tintColor: "white" }} />
          <Text style={{ color: 'white' }}>Trang chủ</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.item}
        // onPress={() => navigation.navigate("Danh sách rạp")}
        >
          <Feather name="user" size={30} color="white" />
          <Text style={{ color: "white" }}>Thành viên</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Danh sách rạp')}>
          {/* <MaterialCommunityIcons name="theater" size={30} color="white" /> */}
          <Image source={iconHomeTheater} style={{ width: 45, height: 45, tintColor: "white" }} />
          <Text style={{ color: 'white' }}>Rạp</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.item}
          // onPress={() => navigation.navigate("BookByRap")}
        >
          <MaterialIcons name="stars" size={30} color="white" />
          <Text style={{color: 'white'}}>Rạp đặc biệt</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.item}
          // onPress={() => navigation.navigate("BookByRap")}
        >
          <FontAwesome name="gift" size={30} color="white" />
          <Text style={{color: 'white'}}>Tin mới & Ưu đãi</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Lịch sử vé")}
        >
          {/* <Foundation name="ticket" size={30} color="white" /> */}

          <Image source={iconTicket} style={{ width: 45, height: 45, tintColor: "white" }} />
          <Text style={{ color: 'white' }}>Vé của tôi</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.item}
          // onPress={() => navigation.navigate("BookByRap")}
        >
          <Fontisto name="shopping-store" size={30} color="white" />
          <Text style={{color: 'white'}}>Cineza Store</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.item}
          // onPress={() => navigation.navigate("BookByRap")}
        >
          <Octicons name="credit-card" size={30} color="white" />
          <Text style={{color: 'white'}}>Cineza eGift</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.item}
          // onPress={() => navigation.navigate("BookByRap")}
        >
          <FontAwesome5 name="stack-exchange" size={30} color="white" />
          <Text style={{color: 'white'}}>Đổi ưu đãi</Text>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Đăng nhập')}>
        <Text style={styles.bookTicket}>Đăng nhập</Text>
        <View style={styles.separator}></View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Đăng ký')}>
        <Text style={styles.bookTicket}>Đăng ký</Text>
        <View style={styles.separator}></View>
      </TouchableOpacity>
    </View>
  );
}

export default Menu;
