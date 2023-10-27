import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Header from "../Header/Header";
const data = {
  title: "Beetlejuice",
  year: "Thứ 2, 3/11/2023",
  time: "14:00-16h00",
  rap: "Vincom Gò Váp",
  cineza: "Cineza 2",
  seat: "Seat: D5",
  total: "120.000đ",
  voucher: "20.000đ",
  final: "100.000đ",
  image:
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg",
};

function PayScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ paddingVertical: 10, backgroundColor: "#d1d1cf" }} />
      <View
        style={{
          flexDirection: "row",

          height: 150,
        }}
      >
        <Image
          style={{
            width: 100,
            height: 130,
            resizeMode: "cover",
            borderRadius: 5,
            marginBottom: 10,
          }}
          source={{ uri: data.image }}
        />
        <View
          style={{
            flexDirection: "column",
            paddingLeft: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
            {data.title}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
            {data.year}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
            {data.time}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
            {data.rap}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
            {data.cineza}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
            {data.seat}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "red" }}>
            Tổng Thanh Toán: {data.total}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>GIẢM GIÁ</Text>
        </View>
        <View>
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
              textAlign: "center",
              textAlignVertical: "bottom",
              width: "100%",
              paddingTop: 7,
              paddingVertical: 10,
              backgroundColor: "#41f268",
              borderWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
            }}
          >
            Xác nhận
          </Text>
        </View>
        <View style={{ marginTop: 20 }}></View>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>TỔNG KẾT</Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Tổng cộng</Text>
            <Text style={{ fontSize: 18, marginRight: 5 }}>{data.total}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Giảm giá</Text>
            <Text style={{ fontSize: 18, marginRight: 5 }}>{data.voucher}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Còn lại</Text>
            <Text style={{ fontSize: 18, marginRight: 5 }}>{data.final}</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}></View>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>THANH TOÁN</Text>
        </View>
      </View>
    </View>
  );
}

export default PayScreen;

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#bfc2c7",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
});
