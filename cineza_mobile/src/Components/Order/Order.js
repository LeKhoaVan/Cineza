import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { formatDayHandle } from '../../util';
import config from '../../config/configAPI';

function Order({ route }) {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataSeat, setDataSeat] = useState([]);
  // const navigation = useNavigation();
  const codeOrder = route.params.codeOrder
  //get order by codeOrder

  useEffect(() => {
    if (codeOrder != "") {
      const getDataOrder = async () => {
        const resultOrder = await axios.get(`http://${config.IPP4}:9000/cineza/api/v1/order/get-by-code/${codeOrder}`);
        if (resultOrder.status == 200 && resultOrder.data != null) {
          console.log(resultOrder.data)
          let resultData = {
            codeOrder: resultOrder.data[0].codeOder,
            movieName: resultOrder.data[0].movieName,
            rapName: resultOrder.data[0].rapName,
            roomName: resultOrder.data[0].roomName,
            showDate: resultOrder.data[0].showDate,
            showStart: resultOrder.data[0].showStart,
            datePay: resultOrder.data[0].datePay
          };
          let itemOrder = [];
          let total = 0;
          for (const item of resultOrder.data) {
            itemOrder = [...itemOrder, { position: item.position, priceItemOrder: item.priceItemOrder }];
            total += item.priceItemOrder;
          }

          setDataSeat(itemOrder);
          setTotalPrice(total);
          setData(resultData);
        }
      };
      getDataOrder();
    }
  }, [codeOrder]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ paddingVertical: 10, backgroundColor: 'white' }}>
          <View style={{ display: "flex", flexDirection: "row", width: '100%' }}>
            <View style={{ display: "flex", flexDirection: "column", width: '66%' }}>
              <View style={styles.viewTicket}>
                <Text style={{ fontSize: 20, paddingLeft: 15, fontWeight: 600, color: "black" }}>
                  Tên phim: {data.movieName}
                </Text>
                <Text style={styles.viewText}>Ngày chiếu: {formatDayHandle(data.showDate)}</Text>
                <Text style={styles.viewText}>Giờ chiếu: {data.showStart != "" ? `${String(new Date(data.showStart).getHours()).padStart(2, '0')}:${String(new Date(data.showStart).getMinutes()).padStart(2, '0')}` : ""}</Text>
              </View>
              <View style={styles.viewTicket}>
                <Text style={styles.viewText1}>Rạp Cineza: {data.rapName}</Text>
                <Text style={styles.viewText}>Tên phòng: {data.roomName}</Text>
              </View>
            </View>

            <View style={{ height: 120, width: 120, marginStart: 30, marginEnd: 10 }}>
              <QRCode value={data.codeOrder} />
            </View>
          </View>

          {dataSeat?.map((seat, idx) => (
            <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.viewTicket}>
                <Text style={styles.viewText1}>Ghế</Text>
                <Text style={styles.viewText}>Vị trí ghế: {seat.position}</Text>
              </View>
              <View
                style={{
                  paddingVertical: 10,
                  justifyContent: 'center',
                  marginRight: 40,
                }}>
                <Text style={styles.viewText1}></Text>
                <Text style={styles.viewText}>Giá: {seat.priceItemOrder.toLocaleString('vi-VN')} VND</Text>
              </View>
            </View>
          ))}

          <View style={styles.viewTicket}>
            <Text style={styles.viewText1}>Tổng tiền</Text>
            <Text style={styles.viewText}>Giá: {totalPrice.toLocaleString('vi-VN')} VND</Text>
          </View>
        </View>

        <View
          style={{
            // borderBottomWidth: 2,
            // borderColor: "black",
            height: 200,
            marginTop: 20,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              paddingHorizontal: 5,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
              }}>
              Vui lòng đưa mã QR đến quầy vé Cineza để nhận vé của bạn.
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#baa66e',
              }}>
              Lưu ý: Cineza không chấp nhận hoàn tiền hoặc đổi vé đã thanh toán
              thành công.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Order;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '95%',
    backgroundColor: 'white',
  },
  viewTicket: {
    // height: 50,
    color: "white",
    paddingVertical: 10,
    justifyContent: 'center',
  },
  viewText1: {
    color: '#8D6E18',
    fontSize: 18,
    paddingLeft: 15,
  },
  viewText: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 15,
  },
});
