import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";

const ProductCard = ({ item }) => {
  const [additems, setAdditems] = useState(0);
  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: "black",
        margin: 5,
        borderRadius: 7,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
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
        source={{ uri: item.image }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "column",
          paddingLeft: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
          {item.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
            {item.price}
          </Text>
          <Pressable
            style={{
              flexDirection: "row",
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                if (additems == 0) {
                  setAdditems(0);
                } else {
                  setAdditems((c) => c - 1);
                }
              }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 0.4,
                borderColor: "#BEBEBE",
                backgroundColor: "#FFA500",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  paddingHorizontal: 3,
                  fontWeight: "600",
                  textAlign: "center",
                  color: "white",
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  paddingHorizontal: 8,
                  color: "white",
                }}
              >
                {additems}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setAdditems((c) => c + 1);
              }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderColor: "#BEBEBE",
                backgroundColor: "#FFA500",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  textAlign: "center",
                  fontWeight: "600",
                  paddingHorizontal: 5,
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
