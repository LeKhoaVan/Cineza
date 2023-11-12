import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../Header/Header';
// import { FontAwesome } from "@expo/vector-icons";
import iconSquare from '../../assets/imageButton/iconSquare.png';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

function SeatBook({route}) {
  const codeRoom = route.params.item.codeRoom;
  const codeShow = route.params.item.code;
  const show = route.params.item;
  const poster = route.params.poster;
  // console.log(codeShow);

  const [dataTicket, setDataTicket] = useState([]);
  // const [dataComunitySeat, setDataComunitySeat] = useState([]);
  // const [dataVipSeat, setDataVipSeat] = useState([]);
  const [dataVipSeatFormat, setDataVipSeatFormat] = useState([]);
  const [dataComunitySeatFormat, setDataComunitySeatFormat] = useState([]);
  const [price, setPrice] = useState(0);

  const [seatSelected, setSeatSelected] = useState([]);

  const navigation = useNavigation();
  // const { seats, setSeats } = useState();

  //get ticket by code show
  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://172.20.10.2:9000/cineza/api/v1/ticket/get-by-showing/` +
  //         codeShow,
  //       {
  //         timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
  //       }
  //     )
  //     .then((res) => {
  //       setDataTicket(res.data);
  //       console.log(res.data.length);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  //get ghế thường
  useEffect(() => {
    const getAll = async () => {
      let dataSeat;
      axios
        .get(
          `http://172.20.10.2:9000/cineza/api/v1/seat/get-all-by-room-type/ts01/` +
            codeRoom,
          {
            timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
          },
        )
        .then(res => {
          // setDataComunitySeat(res.data);
          const newData = res.data.map(item => ({
            ...item,
            selectedUI: false,
          }));
          setDataComunitySeatFormat(newData);
          dataSeat = newData;
        })
        .catch(err => {
          console.log(err);
        });

      const tickets = await axios.get(
        `http://172.20.10.2:9000/cineza/api/v1/ticket/get-by-showing/${codeShow}`,
      );
      const dataTicket = tickets.data;
      const resultSeat = dataSeat.map(s => {
        let tam = s;
        dataTicket.forEach(t => {
          if (t.position == s.position) {
            tam = {...s, isBook: 'SELECTED'};
            return {...s, isBook: 'SELECTED'};
          } else {
            return {...s};
          }
        });
        return tam;
      });
      setDataComunitySeatFormat(resultSeat);
    };
    getAll();
  }, []);

  //get ghế vip
  useEffect(() => {
    const getAll = async () => {
      let dataSeat;
      axios
        .get(
          `http://172.20.10.2:9000/cineza/api/v1/seat/get-all-by-room-type/ts02/` +
            codeRoom,
          {
            timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
          },
        )
        .then(res => {
          // setDataVipSeat(res.data);
          const newData = res.data.map(item => ({
            ...item,
            selectedUI: false,
          }));
          setDataVipSeatFormat(newData);
          dataSeat = newData;
        })
        .catch(err => {
          console.log(err);
        });

      const tickets = await axios.get(
        `http://172.20.10.2:9000/cineza/api/v1/ticket/get-by-showing/${codeShow}`,
      );
      const dataTicket = tickets.data;
      const resultSeat = dataSeat.map(s => {
        let tam = s;
        dataTicket.forEach(t => {
          if (t.position == s.position) {
            tam = {...s, isBook: 'SELECTED'};
            return {...s, isBook: 'SELECTED'};
          } else {
            return {...s};
          }
        });
        return tam;
      });
      setDataVipSeatFormat(resultSeat);
    };
    getAll();
  }, []);

  // useEffect(() => {
  //   console.log("OngNoiMNe", dataVipSeatFormat);
  // }, [dataVipSeatFormat]);

  //chọn ghế thường
  const onComunitySeatSelected = item => {
    const seatSelectedT = dataComunitySeatFormat.find(seat => seat === item);
    if (seatSelectedT) {
      const newews = dataComunitySeatFormat.map(data => {
        if (data === item) {
          if (data.selectedUI) {
            setPrice(price - data.value);
            // console.log("test tue");
            const newArray = seatSelected.filter(item4 => {
              // console.log(item.code);
              return item4.code !== item.code;
            });
            // setSeatSelected(test);
            // console.log(data);
            // console.log(newArray.length);
            setSeatSelected(newArray);
            return {...data, selectedUI: false};
          } else {
            if (seatSelected.length <= 5) {
              setPrice(price + data.value);

              setSeatSelected([...seatSelected, data]);
              return {...data, selectedUI: true};
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
      const newew = dataVipSeatFormat.map(data => {
        if (data === item) {
          if (data.selectedUI) {
            setPrice(price - data.value);
            // console.log("test tue");
            const newArray = seatSelected.filter(item4 => {
              // console.log(item.code);
              return item4.code !== item.code;
            });
            // setSeatSelected(test);
            // console.log(data);
            // console.log(newArray.length);
            setSeatSelected(newArray);
            return {...data, selectedUI: false};
          } else {
            if (seatSelected.length <= 5) {
              setPrice(price + data.value);

              setSeatSelected([...seatSelected, data]);
              return {...data, selectedUI: true};
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

  const onClickHandleSave = item => {
    seatSelected.forEach(async seat => {
      let ticket = {
        codeShowing: route.params.item.code,
        codeSeat: seat.code,
        codeUser: 'user01',
        status: 'ACTIVE',
      };

      try {
        // console.log(ticket);
        const response = await axios.post(
          `http://172.20.10.2:9000/cineza/api/v1/ticket/create`,
          ticket,
        );
        if (response.status === 201) {
          console.log('Lưu thành công');
          // setShowAlert(true);
        } else {
          console.log('Lưu thất bại');
          // setShowAlert(true);
        }
      } catch (error) {
        console.log('save fail: ' + error);
        // setShowAlert(true);
      }
    });
    if (seatSelected.length === 0) {
      Alert.alert('Xin hãy chọn ít nhất 1 ghế');
    } else {
      navigation.navigate('Đồ đi kèm', {
        show,
        seatSelected,
        price,
        poster,
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <View style={{marginVertical: 10, width: '100%'}}>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          {route.params.item.roomName}
        </Text>
      </View>
      <View>
        <FlatList
          numColumns={8}
          data={dataComunitySeatFormat}
          renderItem={({item}) => (
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
          renderItem={({item}) => (
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
          {/* <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#bfbca3"
          /> */}
          <Image
            source={iconSquare}
            style={{
              width: 20,
              height: 20,
              textAlign: 'center',
              marginBottom: 4,
              color: '#bfbca3',
            }}
          />
          <Text>Thường</Text>
        </View>

        <View>
          {/* <FontAwesome
            style={{textAlign: 'center', marginBottom: 4}}
            name="square"
            size={24}
            color="#941833"
          /> */}
          <Image
            source={iconSquare}
            style={{
              width: 20,
              height: 20,
              textAlign: 'center',
              marginBottom: 4,
              color: '#f52749',
            }}
          />
          <Text>VIP</Text>
        </View>

        <View>
          {/* <FontAwesome
            style={{textAlign: 'center', marginBottom: 4}}
            name="square"
            size={24}
            color="#ffc40c"
          /> */}
          <Image
            source={iconSquare}
            style={{
              width: 20,
              height: 20,
              textAlign: 'center',
              marginBottom: 4,
              color: '#ffc40c',
            }}
          />
          <Text>Đang chọn</Text>
        </View>

        {/* <View style={{ marginHorizontal: 20 }}>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="white"
          />
          <Text>Vacant</Text>
        </View> */}

        <View>
          {/* <FontAwesome
            style={{textAlign: 'center', marginBottom: 4}}
            name="square"
            size={24}
            color="#e8e6e6"
          /> */}

          <Image
            source={iconSquare}
            style={{
              width: 20,
              height: 20,
              textAlign: 'center',
              marginBottom: 4,
              color: '#e8e6e6',
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
