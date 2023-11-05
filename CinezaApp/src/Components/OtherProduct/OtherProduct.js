import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "./ProductCard";
import Header from "../Header/Header";

const OtherProduct = ({ route }) => {
  const data = [
    {
      id: "0",
      name: "Combo bắp + 1 nước ngọt",
      image: "https://img.ws.mms.shopee.vn/sg-11134201-22100-pns7444vl4ivc4",
      description: "Crispy Veg Double Patty + Crispy Veg Double Patty",
      price: "180.000đ",
      veg: true,
    },
    {
      id: "1",
      name: "Combo bắp + 2 coca",
      image:
        "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/gia-bap-nuoc-cgv-1.jpg",
      description: "Lit Whopper Jr Veg + Lit Whopper Jr Veg",
      price: "250.000đ",
      veg: true,
    },
    {
      id: "2",
      name: "Combo bắp + 2 nước ngọt",
      image:
        "https://salt.tikicdn.com/cache/280x280/ts/product/65/56/40/917357f489e95a095c5657532b484aa2.jpg",
      description: "Crsipy Chicken Double Patty + Crsipy Chicken Double Patty",
      price: "250.000đ",
      veg: false,
    },
    {
      id: "3",
      name: "Combo bắp + 2 pepsi",
      image:
        "https://down-vn.img.susercontent.com/file/5178202fa8a147917d01aedc379736d0",
      description: "Chicken Whopper + Chicken Whopper",
      price: "250.000đ",
      veg: false,
    },
    {
      id: "4",
      name: "Combo bắp + snacks",
      image: "https://www.lottecinemavn.com/LCMS/Image/Thum/@thum_goods.png",
      description: "2 Crispy Veg Double Patty + 1 King Fries + 1 Veggie Strips",
      price: "150.000đ",
      veg: true,
    },
    {
      id: "5",
      name: "Combo bắp",
      image:
        "https://stc.shopiness.vn/deal/2018/09/19/d/8/f/d/1537333532684_540.png",
      description: "2 Lite Whopper Jr Veg + 1 King Fries",
      price: "90.000đ",
      veg: true,
    },
  ];
  const dataTicket = route.params.show;
  const seats = route.params.seatSelected;
  const value = route.params.price;
  console.log(route.params.price);
  console.log(route.params.show);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ height: "85%", backgroundColor: "#000" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => (
            <ProductCard item={item} key={index} />
          )}
        />
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
              navigation.navigate("PayScreen", { dataTicket, seats, value });
            }}
          >
            <Text style={styles.buttonPay}>Thanh toán</Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

export default OtherProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonPay: {
    fontSize: 15,
    fontWeight: "500",
    padding: 10,
    color: "white",
    backgroundColor: "red",
  },
});
