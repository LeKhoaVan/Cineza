import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header/Header';
// import { FontAwesome } from "@expo/vector-icons";
import iconSquare from '../../assets/imageButton/iconSquare.png';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import config from '../../config';

function SeatBook({ route }) {
  const codeRoom = route.params.item.codeRoom;
  const codeShow = route.params.item.code;
  const show = route.params.item;
  const poster = route.params.poster;

  const [dataTicket, setDataTicket] = useState([]);

  const [dataVipSeatFormat, setDataVipSeatFormat] = useState([]);
  const [dataComunitySeatFormat, setDataComunitySeatFormat] = useState([]);
  const [price, setPrice] = useState(0);

  const [seatSelected, setSeatSelected] = useState([]);
  const [checkSave, setCheckSave] = useState(true);

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

  //get ghế thường
  useEffect(() => {
    const getAll = async () => {
      let dataSeat;

      const res = await axios.get(`http://${config.IPP4}:9000/cineza/api/v1/seat/get-all-by-room-type/ts01/${codeRoom}`)
      if (res.status == 200) {
        const newData = res.data?.map(item => ({
          ...item,
          selectedUI: false,
        }));
        setDataComunitySeatFormat(newData);
        dataSeat = newData;
      } else {
        console.error("error get ticket thuong")
      }

      const tickets = await axios.get(
        `http://${config.IPP4}:9000/cineza/api/v1/ticket/get-by-showing/${codeShow}`,
      );
      if (tickets.status == 200) {
        const dataTicket = tickets.data;
        const resultSeat = dataSeat?.map(s => {
          let tam = s;
          dataTicket.forEach(t => {
            if (t.position == s.position) {
              tam = { ...s, isBook: 'SELECTED' };
            } else {
              // return { ...s };
            }
          });
          return tam;
        });
        setDataComunitySeatFormat(resultSeat);
      } else {
        console.error("error get tickets thuong");
      }
    };
    getAll();
  }, []);

  //get ghế vip
  useEffect(() => {
    const getAll = async () => {
      let dataSeat;
      // axios
      //   .get(
      //     `http://${config.IPP4}:9000/cineza/api/v1/seat/get-all-by-room-type/VIP/` +
      //     codeRoom,
      //     {
      //       timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
      //     },
      //   )
      //   .then(res => {
      //     // setDataVipSeat(res.data);
      //     const newData = res.data?.map(item => ({
      //       ...item,
      //       selectedUI: false,
      //     }));
      //     setDataVipSeatFormat(newData);
      //     dataSeat = newData;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });

      const res = await axios.get(`http://${config.IPP4}:9000/cineza/api/v1/seat/get-all-by-room-type/ts02/` +
        codeRoom,
        {
          timeout: 10000,
        },
      );
      if (res.status == 200) {
        const newData = res.data?.map(item => ({
          ...item,
          selectedUI: false,
        }));
        setDataVipSeatFormat(newData);
        dataSeat = newData;
      } else {
        console.error("error get ticket thuong")
      }

      const tickets = await axios.get(
        `http://${config.IPP4}:9000/cineza/api/v1/ticket/get-by-showing/${codeShow}`,
      );
      const dataTicket = tickets.data;
      const resultSeat = dataSeat?.map(s => {
        let tam = s;
        dataTicket.forEach(t => {
          if (t.position == s.position) {
            tam = { ...s, isBook: 'SELECTED' };
            return { ...s, isBook: 'SELECTED' };
          } else {
            return { ...s };
          }
        });
        return tam;
      });
      setDataVipSeatFormat(resultSeat);
    };
    getAll();
  }, []);


  //chọn ghế thường
  const onComunitySeatSelected = item => {
    const seatSelectedT = dataComunitySeatFormat.find(seat => seat === item);
    if (seatSelectedT) {
      const newews = dataComunitySeatFormat?.map(data => {
        if (data === item) {
          if (data.selectedUI) {
            setPrice(price - data.value);
            const newArray = seatSelected.filter(item4 => {
              return item4.code !== item.code;
            });

            setSeatSelected(newArray);
            return { ...data, selectedUI: false };
          } else {
            if (seatSelected.length <= 5) {
              setPrice(price + data.value);

              setSeatSelected([...seatSelected, data]);
              return { ...data, selectedUI: true };
            } else {
              Alert.alert('tối đa chọn 6 ghế');
            }
          }
        }
        return data;
      });
      setDataComunitySeatFormat(newews);
    }
  };

  //chọn ghế vip
  const onSeatSelected = item => {
    const seatSelectedT = dataVipSeatFormat.find(seat => seat === item);
    if (seatSelectedT) {
      const newew = dataVipSeatFormat?.map(data => {
        if (data === item) {
          if (data.selectedUI) {
            setPrice(price - data.value);
            const newArray = seatSelected.filter(item4 => {
              return item4.code !== item.code;
            });

            setSeatSelected(newArray);
            return { ...data, selectedUI: false };
          } else {
            if (seatSelected.length <= 5) {
              setPrice(price + data.value);

              setSeatSelected([...seatSelected, data]);
              return { ...data, selectedUI: true };
            } else {
              Alert.alert('tối đa chọn 6 ghế');
            }
          }
        }
        return data;
      });
      setDataVipSeatFormat(newew);
    }
  };

  const onClickHandleSave = async () => {
    let tickets = [];

    seatSelected.forEach(async seat => {
      tickets = [...tickets, { codeShowing: route.params.item.code, codeSeat: seat.code, codeUser: user.codeUser, status: 'Hoạt động' }]
    })

    if (seatSelected.length === 0) {
      Alert.alert('Xin hãy chọn ít nhất 1 ghế');
    } else {
      navigation.navigate('Đồ đi kèm', {
        show,
        seatSelected,
        price,
        poster,
        tickets,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ marginVertical: 10, width: '100%' }}>
        <Text style={{ textAlign: 'center', fontSize: 18 }}>
          {route.params.item.roomName}
        </Text>
      </View>
      <View>
        <FlatList
          numColumns={8}
          data={dataComunitySeatFormat}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onComunitySeatSelected(item)}
              style={[
                styles.listComunitySeat,
                item.isBook === 'SELECTED'
                  ? styles.bookedSeat
                  : styles.listComunitySeat,
              ]}
              disabled={item.isBook === 'SELECTED'}>
              {item?.selectedUI ? (
                <Text
                  style={{
                    backgroundColor: '#ffc40c',
                    textAlign: 'center',
                    paddingTop: 7,
                    width: '100%',
                    height: '100%',
                  }}>
                  {item.position}
                </Text>
              ) : (
                <Text>{item?.position}</Text>
              )}
            </Pressable>
          )}
        />

        <FlatList
          numColumns={8}
          data={dataVipSeatFormat}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onSeatSelected(item)}
              style={[
                styles.listVipSeat,
                item.isBook === 'SELECTED'
                  ? styles.bookedSeat
                  : styles.listVipSeat,
              ]}
              disabled={item.isBook === 'SELECTED'}>
              {item?.selectedUI ? (
                <Text
                  style={{
                    backgroundColor: '#ffc40c',
                    textAlign: 'center',
                    paddingTop: 7,
                    width: '100%',
                    height: '100%',
                  }}>
                  {item.position}
                </Text>
              ) : (
                <Text>{item?.position}</Text>
              )}
            </Pressable>
          )}
        />
      </View>
      <View style={styles.sign}>
        <View>
          <View
            style={{
              width: 20,
              height: 20,
              textAlign: 'center',
              marginBottom: 4,
              backgroundColor: '#bfbca3',
            }}
          />
          <Text>Thường</Text>
        </View>

        <View>
          <View
            style={{
              width: 20,
              height: 20,
              textAlign: 'center',
              marginBottom: 4,
              backgroundColor: "#f52749",
            }}
          />
          <Text>VIP</Text>
        </View>

        <View>
          <View
            style={{
              width: 20,
              height: 20,
              textAlign: 'center',
              marginBottom: 4,
              backgroundColor: '#ffc40c',
            }}
          />
          <Text>Đang chọn</Text>
        </View>

        <View>

          <View
            style={{
              width: 20,
              height: 20,
              textAlign: 'center',
              marginBottom: 4,
              backgroundColor: '#e8e6e6',
            }}
          />
          <Text>Đã đặt</Text>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: '#fff',
          padding: 20,
          position: 'absolute',
          bottom: 5,

          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text> {price} đ</Text>
          </View>

          <Pressable onPress={() => onClickHandleSave()}>
            <Text style={styles.buttonPay}>Đặt vé</Text>
          </Pressable>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

export default SeatBook;

const styles = StyleSheet.create({
  buttonPay: {
    fontSize: 15,
    fontWeight: '500',
    padding: 10,
    color: 'white',
    backgroundColor: 'red',
  },
  listComunitySeat: {
    margin: 7,
    backgroundColor: '#bfbca3',
    borderColor: 'gray',
    borderWidth: 0.5,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  listVipSeat: {
    margin: 7,
    backgroundColor: '#941833',
    borderColor: 'gray',
    borderWidth: 0.5,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  sign: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
    backgroundColor: '#D8D8D8',
    padding: 10,
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  bookedSeat: {
    backgroundColor: '#e8e6e6',
    borderColor: 'transparent',
  },
});
