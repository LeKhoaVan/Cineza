import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../Header/Header";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ComunitySeatData = [
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "A6",
  "A7",
  "A8",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "B6",
  "B7",
  "B8",
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
];
const VipSeatData = [
  "D1",
  "D2",
  "D3",
  "D4",
  "D5",
  "D6",
  "D7",
  "D8",
  "E1",
  "E2",
  "E3",
  "E4",
  "E5",
  "E6",
  "E7",
  "E8",
];
function SeatBook({ route }) {
  const codeRoom = route.params.item.codeRoom;
  // console.log(route.params.item.code);
  // console.log(route.params.item);

  const [dataComunitySeat, setDataComunitySeat] = useState([]);
  const [dataVipSeat, setDataVipSeat] = useState([]);
  const [dataVipSeatFormat, setDataVipSeatFormat] = useState([]);
  const [dataComunitySeatFormat, setDataComunitySeatFormat] = useState([]);
  const [price, setPrice] = useState(0);

  const [seatSelected, setSeatSelected] = useState([]);

  const navigation = useNavigation();
  const { seats, setSeats } = useState();

  //get ghế thường
  useEffect(() => {
    axios
      .get(
        `http://172.20.10.2:9000/cineza/api/v1/seat/get-all-by-room-type/ts01/` +
          codeRoom,
        {
          timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
        }
      )
      .then((res) => {
        setDataComunitySeat(res.data);
        const newData = res.data.map((item) => ({
          ...item,
          selectedUI: false,
        }));
        setDataComunitySeatFormat(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //get ghế vip
  useEffect(() => {
    axios
      .get(
        `http://172.20.10.2:9000/cineza/api/v1/seat/get-all-by-room-type/ts02/` +
          codeRoom,
        {
          timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
        }
      )
      .then((res) => {
        setDataVipSeat(res.data);
        const newData = res.data.map((item) => ({
          ...item,
          selectedUI: false,
        }));
        setDataVipSeatFormat(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //chọn ghế thường
  const onComunitySeatSelected = (item) => {
    const seatSelectedT = dataComunitySeatFormat.find((seat) => seat === item);
    if (seatSelectedT) {
      const newData = dataComunitySeatFormat.map((i) => {
        if (i === item) {
          if (seatSelected.length < 5) {
            return { ...i, selectedUI: !i.selectedUI };
          } else {
            Alert.alert("tối đa chọn 5 ghế");
            return { ...i };
          }
        } else {
          return { ...i };
        }
      });
      setDataComunitySeatFormat(newData);

      dataComunitySeatFormat.forEach(async (i) => {
        if (i === item) {
          if (i.selectedUI) {
            setPrice(price - i.value);
          } else {
            if (seatSelected.length < 5) {
              const resultPrice = await axios.get(
                `http://172.20.10.2:9000/cineza/api/v1/seat/get-price/${item.codeTypeSeat}`
              );
              if (resultPrice.status === 200) {
                setPrice(price + resultPrice.data.value);
                setSeatSelected([...seatSelected, i]);
                console.log("test", seatSelected);
              } else {
                console.log("error get price");
              }
            }
          }
        }
      });
    }
  };

  //chọn ghế vip
  const onSeatSelected = (item) => {
    const seatSelectedT = dataVipSeatFormat.find((seat) => seat === item);
    if (seatSelectedT) {
      // const newData = dataVipSeatFormat.map((i) => {
      //   if (i === item) {
      //     if (seatSelected.length <= 5) {
      //       return { ...i, selectedUI: !i.selectedUI };
      //     } else {
      //       if (i.selectedUI) {
      //         setPrice(price - i.value);
      //         seatSelected.filter((se) => se === i);
      //         console.log(seatSelected.length);
      //         console.log("test");
      //         return { ...i, selectedUI: false };
      //       } else {
      //         Alert.alert("tối đa chọn 5 ghế");
      //         console.log("1234", seatSelected);
      //         return { ...i };
      //       }
      //     }
      //   } else {
      //     return { ...i };
      //   }
      // });
      // setDataVipSeatFormat(newData);

      // dataVipSeatFormat.forEach((i) => {
      //   if (i === item) {
      //     if (i.selectedUI) {
      //       setPrice(price - i.value);
      //     } else {
      //       if (seatSelected.length <= 5) {
      //         setPrice(price + i.value);
      //         i = { ...i, selectedUI: true };
      //         setSeatSelected([...seatSelected, i]);
      //         dataVipSeatFormat = [...dataVipSeatFormat, seatSelected];
      //       }
      //     }
      //   }
      // });

      const newew = dataVipSeatFormat.map((data) => {
        if (data === item) {
          if (data.selectedUI) {
            setPrice(price - data.value);
            console.log("test tue");
            const newArray = seatSelected.filter((item4) => {
              console.log(item.code);
              return item4.code !== item.code;
            });
            // setSeatSelected(test);
            console.log(data);
            console.log(newArray.length);
            setSeatSelected(newArray);
            return { ...data, selectedUI: false };
          } else {
            if (seatSelected.length <= 5) {
              setPrice(price + data.value);

              setSeatSelected([...seatSelected, data]);
              return { ...data, selectedUI: true };
            }
          }
        }
        return data;
      });
      setDataVipSeatFormat(newew);
    }
  };

  const onClickHandleSave = () => {
    seatSelected.forEach(async (seat) => {
      let ticket = {
        codeShowing: route.params.item.code,
        codeSeat: seat.code,
        codeUser: "user01",
        status: "ACTIVE",
      };

      try {
        console.log(ticket);
        const response = await axios.post(
          `http://172.20.10.2:9000/cineza/api/v1/ticket/create`,
          ticket
        );
        if (response.status === 201) {
          console.log("Lưu thành công");
          // setShowAlert(true);
        } else {
          console.log("Lưu thất bại");
          // setShowAlert(true);
        }
      } catch (error) {
        console.log("save fail: " + error);
        // setShowAlert(true);
      }
    });
    navigation.navigate("OtherProduct", { item: route.params.item });
  };

  // navigation.navigate("OtherProduct");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ marginVertical: 10, width: "100%" }}>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
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
              style={styles.listComunitySeat}
            >
              {item?.selectedUI ? (
                <Text style={{ backgroundColor: "#ffc40c" }}>
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
                // item.isBook === "SELECTED" && styles.bookedSeat,
              ]}
            >
              {item?.selectedUI ? (
                <Text style={{ backgroundColor: "#ffc40c" }}>
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
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#bfbca3"
          />
          <Text>Thường</Text>
        </View>

        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#941833"
          />
          <Text>VIP</Text>
        </View>

        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#ffc40c"
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
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#e8e6e6"
          />
          <Text>Đã đặt</Text>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: "#fff",
          padding: 20,
          position: "absolute",
          bottom: 5,

          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text>Total: {price} VND</Text>
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
    fontWeight: "500",
    padding: 10,
    color: "white",
    backgroundColor: "red",
  },
  listComunitySeat: {
    margin: 7,
    backgroundColor: "#bfbca3",
    borderColor: "gray",
    borderWidth: 0.5,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  listVipSeat: {
    margin: 7,
    backgroundColor: "#941833",
    borderColor: "gray",
    borderWidth: 0.5,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  sign: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 30,
    backgroundColor: "#D8D8D8",
    padding: 10,
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  bookedSeat: {
    backgroundColor: "#e8e6e6",
    borderColor: "transparent",
  },
});
