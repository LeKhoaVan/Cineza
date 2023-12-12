import React, { useState, useRoute, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../Header/Header";
import axios from "axios";
import { formatDateHandle } from "../../util";

import config from "../../config/configAPI";

const MovieDetail = ({ route }) => {
  const codeMovie = route.params.item.code;
  const poster = route.params.item.moviePoster;
  const [dataMovie, setDataMovie] = useState("");
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Chọn rạp", { codeMovie, poster });
  };

  useEffect(() => {
    axios
      .get(`http://${config.IPP4}:9000/cineza/api/v1/movie/${codeMovie}`)
      .then((res) => {
        let resultData = res.data;
        resultData.moviePoster = res.data.moviePoster.replace(/\\/g, "/").replace("localhost", config.IPP4);
        setDataMovie(resultData);
        // setDataMovie(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View>
          {dataMovie == "" ? "" : (<Image style={styles.image} source={{ uri: dataMovie?.moviePoster, }}
            alt="movie poster"
          />)}
        </View>
        <View style={styles.content}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 24,
              fontWeight: '600',
              marginBottom: 20,
            }}
          >
            {dataMovie.movieName}
          </Text>

          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 10,
          }}>
            <Text style={styles.viewText}>Mô tả: </Text>
            <Text style={[styles.viewTextData, { width: "70%" }]}>
              {dataMovie.description}
            </Text>
          </View>


          <View style={styles.viewContent}>
            <Text style={styles.viewText}>Ngày phát hành: </Text>
            <Text style={styles.viewTextData}>
              {String(new Date(dataMovie.startDate).getDate()).padStart(2, '0')}-{String(new Date(dataMovie.startDate).getMonth()).padStart(2, '0')}-{String(new Date(dataMovie.startDate).getFullYear())}
            </Text>
          </View>

          <View style={styles.viewContent}>
            <Text style={styles.viewText}>Thời lượng: </Text>
            <Text style={styles.viewTextData}>
              {dataMovie.movieTime} phút
            </Text>
          </View>

          <View style={styles.viewContent}>
            <Text style={styles.viewText}>Đạo diễn: </Text>
            <Text style={styles.viewTextData}>{dataMovie.director}</Text>
          </View>
          <View style={styles.viewContent}>
            <Text style={styles.viewText}>Diễn viên: </Text>
            <Text style={styles.viewTextData}>{dataMovie.actor}</Text>
          </View>

          <View style={styles.viewContent}>
            <Text style={styles.viewText}>Ngôn ngữ: </Text>
            <Text style={styles.viewTextData}>
              {dataMovie.language}
            </Text>
          </View>


        </View>
        <Pressable
          style={{
            position: "absolute",
            top: '92%',
            right: '0%',
            width: "100%",
            zIndex: 2,
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity onPress={handleClick}>
              <Text style={styles.buttonBookTicket}>Đặt vé</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 0,
  },
  image: {
    width: "100%",
    height: 320,
    resizeMode: 'cover',
  },
  content: {
    marginTop: 10,
    padding: 5,
  },
  viewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  viewText: {
    fontSize: 18,
    fontWeight: '400',
    color: "#b3a58d",
  },
  viewTextData: {
    fontSize: 18,
    fontWeight: '400',
  },
  buttonBookTicket: {
    color: "#fff",
    padding: 10,
    marginRight: 20,
    fontSize: 18,
    backgroundColor: "red",
  },
});
