import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

const data = [
  { name: "a1" },
  { name: "a2" },
  { name: "a3" },
  { name: "a4" },
  { name: "a5" },
];
function TicketHistory() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingVertical: 10, backgroundColor: "#d1d1cf" }} />
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.viewTicket}>
                <Text style={styles.viewText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default TicketHistory;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  viewTicket: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1cf",
  },
  viewText: {
    fontSize: 18,
    paddingLeft: 15,
  },
});
