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

function Slider_Movie(dataFindMovie) {
  const [index, setIndex] = useState(0);
  const [dataMovie, setDataMovie] = useState([]);
  const isCarousel = useRef(null);
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Thông tin phim', { item });
  };

  useEffect(() => {
    if (dataFindMovie.dataFindMovie.length == 0) {
      axios
        .get(`http://${config.IPP4}:9000/cineza/api/v1/movie/get-all-for-user/${moment().format("YYYY-MM-DD")}`, {
          // .get(`http://${configAPI.IPP4}:9000/cineza/api/v1/movie/get-all`, {
          timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
        })
        .then(res => {
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
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const correctedDataArray = dataFindMovie.dataFindMovie?.map(item => {
        const originalImagePath = item.moviePoster;
        const correctedImagePath = originalImagePath
          .replace(/\\/g, '/')
          .replace('localhost', configAPI.IPP4);
        item.moviePoster = correctedImagePath;
        return item;
      });
      setDataMovie(correctedDataArray);
    }
  }, [dataFindMovie]);

  return (
    <View
      style={{ paddingTop: 10, alignItems: 'center', backgroundColor: 'black' }}>
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
    </View>
  );
}

export default Slider_Movie;
