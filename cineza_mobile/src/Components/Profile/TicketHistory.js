import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { formatDayHandle } from '../../util';
import config from '../../config/configAPI';

const data = [
  { name: 'a1' },
  { name: 'a2' },
  { name: 'a3' },
  { name: 'a4' },
  { name: 'a5' },
];
const RenderItem = ({ item, handleClick }) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={styles.viewTicket}>
        <Text style={styles.viewText}>
          {formatDayHandle(item.bookAt)} {item.movieName} {item.rapName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
function TicketHistory() {
  const [dataTicket, setDataTicket] = useState([]);
  const navigation = useNavigation();

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

  const handleClick = item => {
    navigation.navigate('Chi tiết vé', { codeOrder: item });
  };
  //get ticket
  useEffect(() => {
    if (user.codeUser != undefined) {
      const getOrderHistory = async () => {
        console.log(user.codeUser)
        const orders = await axios.get(`http://${config.IPP4}:9000/cineza/api/v1/order/get-by-user/${user.codeUser}`);
        if (orders.status == 200) {
          setDataTicket(orders.data);
        } else {
          console.log("error get order history")
        }
      }
      getOrderHistory();
    }
  }, [user.codeUser]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingVertical: 10, backgroundColor: '#d1d1cf' }} />
      <View>
        <FlatList
          data={dataTicket}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleClick(item.code)}>
              <View style={styles.viewTicket}>
                <Text style={styles.viewText}>
                  {item.description}
                </Text>
                <Text style={styles.viewText}>
                  {item.datePay != "" ? `${String(new Date(item.datePay).getHours()).padStart(2, '0')}:${String(new Date(item.datePay).getMinutes()).padStart(2, '0')} ` : ""} - {formatDayHandle(item.datePay)}              {item.priceTotal.toLocaleString('vi-VN')} VND
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default TicketHistory;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  viewTicket: {
    // height: 50,
    paddingVertical: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1cf',
  },
  viewText: {
    fontSize: 18,
    paddingLeft: 15,
  },
});
