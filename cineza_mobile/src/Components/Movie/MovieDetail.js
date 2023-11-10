import React, { useState, useRoute, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../Header/Header";
import axios from "axios";
import { formatDateHandle } from "../../util";

const data = {
  id: 1,
  title: "Beetlejuice",
  year: "1988",
  runtime: "92",
  genres: ["Comedy", "Fantasy"],
  director: "Tim Burton",
  actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
  plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
  posterUrl:
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg",
};

const MovieDetail = ({ route }) => {
  const codeMovie = route.params.item.code;
  const poster = route.params.item.moviePoster;
  const [dataMovie, setDataMovie] = useState([]);
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Chọn rạp", { codeMovie, poster });
  };
  useEffect(() => {
    axios
      .get(`http://172.20.10.2:9000/cineza/api/v1/movie/` + codeMovie, {
        timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
      })
      .then((res) => {
        // const originalDataArray = res.data;
        // const correctedDataArray = originalDataArray.map((item) => {
        //   const originalImagePath = item.moviePoster;
        //   const correctedImagePath = originalImagePath
        //     .replace(/\\/g, "/")
        //     .replace("localhost", "172.20.10.2");
        //   item.moviePoster = correctedImagePath;
        //   return item;
        // });
        setDataMovie(res.data);
        // setDataMovie(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Image
          style={styles.image}
          source={{
            uri: dataMovie.moviePoster,
          }}
        />
      </View>
      <View style={styles.content}>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          {dataMovie.movieName}
        </Text>
        <View>
          <Text
            style={{
              width: "100%",
              fontSize: 18,
              fontWeight: 400,
            }}
          >
            {dataMovie.description}
          </Text>
        </View>
        <View style={styles.viewContent}>
          <Text style={styles.viewText}>Ngày phát hành: </Text>
          <Text style={styles.viewTextData}>
            {formatDateHandle(dataMovie.startDate)}
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
      </View>
      <Pressable
        style={{
          position: "absolute",
          bottom: 5,
          width: "100%",
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
    width: 380,
    height: 320,
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
    fontWeight: 600,
    color: "#b3a58d",
  },
  viewTextData: {
    fontSize: 18,
    fontWeight: 400,
  },
  buttonBookTicket: {
    color: "#fff",
    padding: 10,
    marginRight: 20,
    fontSize: 18,
    backgroundColor: "red",
  },
});
