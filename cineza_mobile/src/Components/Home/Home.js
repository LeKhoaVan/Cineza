import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";

import Header from "../Header/Header";
import Slider_Movie from "../SliderMovie/SliderMovie";
import AnotherShow from "./AnotherShow";
import axios from "axios";
import config from "../../config/configAPI";

function Home() {
  const [findMovie, setFindMovie] = useState([]);
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    const findMovie = async () => {
      const dataMovie = await axios.get(`http://${config.IPP4}:9000/cineza/api/v1/movie/find-movie-for-user?movieName=${keyWord}`)

      if (dataMovie.data.length != 0) {
        setFindMovie(dataMovie.data);
      }
    }
    findMovie();
  }, [keyWord])

  return (
    <ScrollView style={{ width: '100%', height: '100%', backgroundColor: "#120b4a" }}>
      <Header />

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Tìm kiếm..."
          style={styles.input}
          onChangeText={(text) => setKeyWord(text)}
        />
      </View>

      <Slider_Movie dataFindMovie={findMovie} />
      <AnotherShow />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 10,
    padding: 5,
    elevation: 2,
  },
  searchIcon: {
    paddingRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
});

export default Home;
