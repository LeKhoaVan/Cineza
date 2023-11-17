import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {formatDayHandle} from '../../util';

function Order() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  //get order
  // useEffect(() => {
  //   axios
  //     .get(`http://172.20.10.2:9000/cineza/api/v1/ticket/get-all/`, {
  //       timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
  //     })
  //     .then((res) => {
  //       setDataTicket(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingVertical: 10, backgroundColor: '#d1d1cf'}}>
        <View style={styles.viewTicket}>
          <Text style={{fontSize: 20, paddingLeft: 15, fontWeight: 600}}>
            Tên phim
          </Text>
          <Text style={styles.viewText}>Ngày chiếu</Text>
          <Text style={styles.viewText}>Giờ chiếu</Text>
        </View>
        <View style={styles.viewTicket}>
          <Text style={styles.viewText1}>Rạp Cineza</Text>
          <Text style={styles.viewText}>Tên rạp</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.viewTicket}>
            <Text style={styles.viewText1}>Ghế</Text>
            <Text style={styles.viewText}>Vị trí ghế</Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              justifyContent: 'center',
              marginRight: 40,
            }}>
            <Text style={styles.viewText1}>Phòng chiếu</Text>
            <Text style={styles.viewText}>Tên phòng</Text>
          </View>
        </View>
        <View style={styles.viewTicket}>
          <Text style={styles.viewText1}>Tổng tiền</Text>
          <Text style={styles.viewText}>Giá</Text>
        </View>
      </View>
      <View style={{height: 150, backgroundColor: 'black'}}></View>
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
            Vui lòng đưa mã số này đến quầy vé Cineza để nhận vé của bạn.
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
    </SafeAreaView>
  );
}

export default Order;

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
  },
  viewText1: {
    color: '#baa66e',
    fontSize: 18,
    paddingLeft: 15,
  },
  viewText: {
    fontSize: 18,
    paddingLeft: 15,
  },
});
