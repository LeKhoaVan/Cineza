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

const data = [
  {
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
  },
  {
    id: 2,
    title: "The Cotton Club",
    year: "1984",
    runtime: "127",
    genres: ["Crime", "Drama", "Music"],
    director: "Francis Ford Coppola",
    actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee",
    plot: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
  },
  {
    id: 3,
    title: "The Shawshank Redemption",
    year: "1994",
    runtime: "142",
    genres: ["Crime", "Drama"],
    director: "Frank Darabont",
    actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
    plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg",
  },
  {
    id: 4,
    title: "Crocodile Dundee",
    year: "1986",
    runtime: "97",
    genres: ["Adventure", "Comedy"],
    director: "Peter Faiman",
    actors: "Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil",
    plot: "An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg",
  },
  {
    id: 5,
    title: "Valkyrie",
    year: "2008",
    runtime: "121",
    genres: ["Drama", "History", "Thriller"],
    director: "Bryan Singer",
    actors: "Tom Cruise, Kenneth Branagh, Bill Nighy, Tom Wilkinson",
    plot: "A dramatization of the 20 July assassination and political coup plot by desperate renegade German Army officers against Hitler during World War II.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjkyMTE1OTYwNF5BMl5BanBnXkFtZTcwMDIxODYzMw@@._V1_SX300.jpg",
  },
];

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
    navigation.navigate("Chọn rạp", { codeMovie: item.code , poster: item.moviePoster });
  };

  useEffect(() => {
    axios
      .get(`http://172.20.10.2:9000/cineza/api/v1/movie/get-all`, {
        timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
      })
      .then((res) => {
        const originalDataArray = res.data;
        const correctedDataArray = originalDataArray.map((item) => {
          const originalImagePath = item.moviePoster;
          const correctedImagePath = originalImagePath
            .replace(/\\/g, "/")
            .replace("localhost", "172.20.10.2");
          item.moviePoster = correctedImagePath;
          return item;
        });
        setDataMovie(correctedDataArray);
        // setDataMovie(res.data);
        // console.log(correctedDataArray);
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