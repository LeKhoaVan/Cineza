import React from "react";
import styles from "./Style_Home";
import { View, Text, TouchableOpacity } from "react-native";

import Header from "../Header/Header";
import Slider_Movie from "../SliderMovie/SliderMovie";
import AnotherShow from "./AnotherShow";
function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0c0736" }}>
      <Header />
      <Slider_Movie />
      <AnotherShow />
    </View>
  );
}

export default Home;
