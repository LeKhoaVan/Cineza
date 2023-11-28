import React, { useState, useRef, useEffect } from 'react';
import styles from './StyleSliderMovie';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';

import configAPI from '../../config/configAPI';
import config from '../../config/configAPI';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.68;

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
    runtime: '92',
    genres: ['Comedy', 'Fantasy'],
    director: 'Tim Burton',
    actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
    plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg',
  },
  {
    id: 2,
    title: 'The Cotton Club',
    year: '1984',
    runtime: '127',
    genres: ['Crime', 'Drama', 'Music'],
    director: 'Francis Ford Coppola',
    actors: 'Richard Gere, Gregory Hines, Diane Lane, Lonette McKee',
    plot: 'The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
  },
  {
    id: 3,
    title: 'The Shawshank Redemption',
    year: '1994',
    runtime: '142',
    genres: ['Crime', 'Drama'],
    director: 'Frank Darabont',
    actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
    plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg',
  },
  {
    id: 4,
    title: 'Crocodile Dundee',
    year: '1986',
    runtime: '97',
    genres: ['Adventure', 'Comedy'],
    director: 'Peter Faiman',
    actors: 'Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil',
    plot: 'An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg',
  },
  {
    id: 5,
    title: 'Valkyrie',
    year: '2008',
    runtime: '121',
    genres: ['Drama', 'History', 'Thriller'],
    director: 'Bryan Singer',
    actors: 'Tom Cruise, Kenneth Branagh, Bill Nighy, Tom Wilkinson',
    plot: 'A dramatization of the 20 July assassination and political coup plot by desperate renegade German Army officers against Hitler during World War II.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMjkyMTE1OTYwNF5BMl5BanBnXkFtZTcwMDIxODYzMw@@._V1_SX300.jpg',
  },
];

const RenderItem = ({ item, handleClick }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 10,
        // borderRadius: 20,
        alignItems: 'center',
        width: 250,
      }}>
      <TouchableOpacity onPress={() => handleClick(item)}>
        <Image
          source={{ uri: item.moviePoster }}
          style={{ width: 230, height: 320, borderRadius: 10 }}
        />
        <Text
          style={{
            marginVertical: 10,
            fontSize: 20,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
          }}>
          {item.movieName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function Slider_Movie() {
  const [index, setIndex] = useState(0);
  const [dataMovie, setDataMovie] = useState([]);
  const isCarousel = useRef(null);
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Thông tin phim', { item });
  };

  useEffect(() => {
    axios
      .get(`http://${config.IPP4}:9000/cineza/api/v1/movie/get-all-for-user/${moment().format("YYYY-MM-DD")}`, {
        // .get(`http://${configAPI.IPP4}:9000/cineza/api/v1/movie/get-all`, {
        timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
      })
      .then(res => {
        console.log(res.data)
        const originalDataArray = res.data;
        const correctedDataArray = originalDataArray.map(item => {
          const originalImagePath = item.moviePoster;
          const correctedImagePath = originalImagePath
            .replace(/\\/g, '/')
            .replace('localhost', configAPI.IPP4);
          item.moviePoster = correctedImagePath;
          return item;
        });
        setDataMovie(correctedDataArray);
        // setDataMovie(res.data);
        // console.log(correctedDataArray);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View
      style={{ paddingTop: 30, alignItems: 'center', backgroundColor: 'black' }}>
      <Carousel
        ref={isCarousel}
        data={dataMovie}
        renderItem={({ item }) => (
          <RenderItem handleClick={handleClick} item={item} />
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
      />
      {/* <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#F4BB41",
        }}
        tappableDots={true}
        inactiveDotStyle={{
          backgroundColor: "black",
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
    </View>
  );
}

export default Slider_Movie;
