import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Header from "../Header/Header";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const tableData = [
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "A6",
  "A7",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "B6",
  "B7",
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "D1",
  "D2",
  "D3",
  "D4",
  "D5",
  "D6",
  "D7",
  "E1",
  "E2",
  "E3",
  "E4",
  "E5",
  "E6",
  "E7",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "G1",
  "G2",
  "G3",
  "G4",
  "G5",
  "G6",
  "G7",
];
function SeatBook() {
  const navigation = useNavigation();
  const { seats, setSeats } = useState();
  // const onSeatSelected = (item) => {
  //   const seatSelected = seats.find((seat) => seat === item);
  //   if (seatSelected) {
  //     seats.filter((seat) => seat !== item);
  //   } else {
  //     setSeats([...seats, item]);
  //   }
  // };
  // console.log(seats);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ marginTop: 20 }} />
      <View>
        <FlatList
          numColumns={7}
          data={tableData}
          renderItem={({ item }) => (
            <Pressable
              // onPress={() => onSeatSelected(item)}
              style={{
                margin: 10,
                backgroundColor: "#f8f8f8",
                borderColor: "gray",
                borderWidth: 0.5,
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              {/* {seats.includes(item) ? (
              <Text style={{ backgroundColor: "#ffc40c" }}>{item}</Text>
            ) : (
              <Text>{item}</Text>
            )} */}
              <Text>{item}</Text>
            </Pressable>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 100,
          marginTop: 20,
          backgroundColor: "#D8D8D8",
          padding: 10,
        }}
      >
        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#ffc40c"
          />
          <Text>selected</Text>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="white"
          />
          <Text>Vacant</Text>
        </View>

        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#989898"
          />
          <Text>Occupied</Text>
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
            <Text>Total: </Text>
          </View>

          <Pressable
            onPress={() => {
              navigation.navigate("OtherProduct");
            }}
          >
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
});
