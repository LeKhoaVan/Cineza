import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import Header from "../Header/Header";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { formatDayHandle } from "../../util";

import config from "../../config/configAPI";


const Item = ({ item, handleClick }) => {
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: "#d1d1cf" }}>
      <TouchableOpacity style={styles.item} onPress={() => handleClick(item)}>
        <Image style={styles.image} source={{ uri: item.moviePoster }}></Image>
        <View style={styles.description}>
          <Text style={styles.title}>{item.movieName}</Text>
          <Text style={styles.year}>{formatDayHandle(item.startDate)}</Text>
          <Text style={styles.year}>{item.movieTime}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

function BookByMovie() {
  const [dataMovie, setDataMovie] = useState([]);

  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Chọn rạp", { codeMovie: item.code, poster: item.moviePoster });
  };

  useEffect(() => {
    axios
      .get(`http://${config.IPP4}:9000/cineza/api/v1/movie/get-all`, {
        timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
      })
      .then((res) => {
        const originalDataArray = res.data;
        const correctedDataArray = originalDataArray.map((item) => {
          const originalImagePath = item.moviePoster;
          const correctedImagePath = originalImagePath
            .replace(/\\/g, "/")
            .replace("localhost", config.IPP4);
          item.moviePoster = correctedImagePath;
          return item;
        });
        setDataMovie(correctedDataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ paddingVertical: 10, backgroundColor: "#d1d1cf" }} />
      <View>
        <FlatList
          data={dataMovie}
          renderItem={({ item }) => (
            <Item item={item} handleClick={handleClick} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

export default BookByMovie;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#ffff",
    paddingTop: 5,
    // marginVertical: 8,
    // marginHorizontal: 16,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 140,
  },
  description: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    marginLeft: 10,
  },
  title: {
    paddingTop: 10,
    fontSize: 20,
    height: 50,
  },
  year: {
    fontSize: 16,
    color: "#a5a874",
  },
});
