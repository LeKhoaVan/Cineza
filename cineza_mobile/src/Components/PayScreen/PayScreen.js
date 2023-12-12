import { Image, StyleSheet, Text, TextInput, Linking, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/configAPI';
import { useNavigation } from "@react-navigation/native";

import Header from '../Header/Header';
import { formatDayHandle, formatTimeHandle } from '../../util';

function PayScreen({ route }) {
  const ticketData = route.params.dataShow;
  const seat = route.params.seats;
  const total = route.params.value;
  const posterMovie = route.params.poster;
  const tickets = route.params.tickets;

  const navigation = useNavigation();

  const dataSeat = seat.map(data => {
    return data.position + ',';
  });

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

  const [dataPay, setDataPay] = useState("")

  const handleOnPressThanToan = async () => {
    // codeTickets.forEach(async (codeTicket) => {
    //   try {
    //     let dataOrder = {
    //       codeTicket: codeTicket,
    //       codeUser: "user01",
    //       description: "test save",
    //       status: "Hoạt động"
    //     };
    //     console.log("---------------dataOrder---------")
    //     console.log(dataOrder)
    //     const response = await axios.post(
    //       `http://${config.IPP4}:9000/cineza/api/v1/order/save${dataOrder}`);
    //     if (response.status === 201) {
    //       console.log('Lưu order thành công');
    //       // setShowAlert(true);
    //     } else {
    //       console.log('Lưu order thất bại');
    //       // setShowAlert(true);
    //     }
    //   } catch (error) {
    //     console.log('save order fail: ' + error);
    //   }
    // });

    // payment zalopay

    const dataPay = {
      value: total,
      dataSeat: dataSeat,
      dataShow: ticketData,
    }
    const result = await axios.post(`http://${config.IPP4}:9000/cineza/api/v1/test-bank`, { dataPay });
    setDataPay(result.data.orderurl)
    // const linkTest = `https://google.com`
    // Mở trình duyệt web
    const supported = Linking.canOpenURL(result.data.orderurl);
    if (supported) {
      console.log("open link: ", result.data.orderurl)
      Linking.openURL(result.data.orderurl);
    } else {
      console.error("Can't open URL: ", url);
    }
  }

  useEffect(() => {
    if (dataPay != "") {
      let counter = 0;
      const logEvery5Seconds = () => {
        const intervalId = setInterval(async () => {
          const result = await axios.post(`http://${config.IPP4}:9000/cineza/api/v1/check-status-payment`);
          console.log(result.data)
          if (result.status == 200) {
            if (result.data.returncode == 1) {
              // save ticket
              const codeTicket = [];
              for (const t of tickets) {
                try {
                  const response = await axios.post(
                    `http://${config.IPP4}:9000/cineza/api/v1/ticket/create`,
                    t,
                  );
                  if (response.status === 201) {
                    codeTicket.push({ codeTicket: response.data.code, priceTicket: t.priceTicket });
                    await AsyncStorage.removeItem('movieSelect');
                    console.log('Lưu ticket thành công');
                  } else {
                    console.log('Lưu thất bại');
                  }
                } catch (error) {
                  console.log('Save fail: ' + error);
                }
              }

              const dataOrder = {
                codeTicket: codeTicket,
                codeUser: user.codeUser,
                description: "thanh toán vé xem phim: " + ticketData.movieName,
                priceTotal: total,
                status: "Hoạt động"
              }
              console.log("--------------------dataOrder_____________")
              console.log(dataOrder)
              const responseOrder = await axios.post(`http://${config.IPP4}:9000/cineza/api/v1/order/save`, dataOrder);
              if (responseOrder.status === 201) {
                console.log('Lưu order thành công');
                navigation.navigate("Hóa đơn", { codeOrder: responseOrder.data.code })
                clearInterval(intervalId);
              } else {
                console.log('Lưu order thất bại');
              }
              // navigation.navigate("Hóa đơn", { codeOrder: responseOrder.data.code })
              // clearInterval(intervalId);

            }
          }
          counter++;

          if (counter === 5) {
            clearInterval(intervalId); // Dừng lại sau 5 lần
          }
        }, 5000);
      };

      logEvery5Seconds();
    }
  }, [dataPay]);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ paddingVertical: 10, backgroundColor: '#d1d1cf' }} />
      <View
        style={{
          flexDirection: 'row',
          height: 150,
        }}>
        <Image
          style={{
            width: 100,
            height: 130,
            resizeMode: 'cover',
            borderRadius: 5,
            marginBottom: 10,
          }}
          source={{ uri: posterMovie }}
        />
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: 'column',
            alignContent: "flex-start",
            paddingLeft: 20,
          }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>
            {ticketData.movieName}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>
            {formatDayHandle(ticketData.showDate)}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>
            {formatTimeHandle(ticketData.showStart)}-
            {formatTimeHandle(ticketData.showEnd)}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>
            {ticketData.rapName}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>
            {ticketData.roomName}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>
            {dataSeat}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'red' }}>
            Tổng Thanh Toán: {total.toLocaleString('vi-VN')} VND
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        {/* <View style={styles.title}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>GIẢM GIÁ</Text>
        </View> */}
        {/* <View>
          <TextInput
            placeholder="Nhập mã khuyến mãi"
            style={{
              borderWidth: 1,
              borderRadius: 5,
              paddingVertical: 10,
              marginTop: 10,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              textAlignVertical: 'bottom',
              width: '100%',
              paddingTop: 7,
              paddingVertical: 10,
              backgroundColor: '#41f268',
              borderWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
            }}>
            Xác nhận
          </Text>
        </View> */}
        <View style={{ marginTop: 20 }}></View>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>TỔNG KẾT</Text>
        </View>

        <WebView style={{ width: 100, height: 100 }} source={{ uri: dataPay == "https://www.google.com" ? '' : dataPay }} />

        <View style={{ marginVertical: 5 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Tổng cộng</Text>
            <Text style={{ fontSize: 18, marginRight: 5 }}>{total.toLocaleString('vi-VN')} VND</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Thuế</Text>
            <Text style={{ fontSize: 18, marginRight: 5 }}>0 VND</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Còn lại:</Text>
            <Text style={{ fontSize: 18, marginRight: 5 }}>{total.toLocaleString('vi-VN')} VND</Text>
            {/* <Text style={{ fontSize: 18, marginRight: 5 }}>{data.final}</Text> */}
          </View>
        </View>
        <View style={{ marginTop: 20 }}></View>
        <View style={styles.title}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleOnPressThanToan}>
            <Text style={styles.buttonText}>Thanh Toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PayScreen;

const styles = StyleSheet.create({
  title: {
    backgroundColor: '#bfc2c7',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#339900',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
