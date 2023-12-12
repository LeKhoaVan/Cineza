import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../Header/Header";
import axios from "axios";
import { formatDateHandle, formatTimeHandle } from "../../util";
import config from "../../config/configAPI";
import moment from 'moment';


const ExpandableComponent = ({ newItem, onClickFunction, poster, fladLG }) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(null);
  const [dataShow, setDataShow] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getDataShow = async () => {
      const year = `${new Date(newItem.showStart).getFullYear()}`
      const month = `${String(new Date(newItem.showStart).getMonth() + 1).padStart(2, '0')}`
      const day = `${String(new Date(newItem.showStart).getDate()).padStart(2, '0')}`
      const date = `${year}-${month}-${day}`
      const response = await axios.get(
        `http://${config.IPP4}:9000/cineza/api/v1/show/get-by-rap-movie-data/${newItem.codeRap
        }/${newItem.codeMovie}/${date}`
      );
      if (response.status === 200) {
        setDataShow(response.data);
      } else {
        console.log("error get data show");
      }
    };
    getDataShow();
  }, []);


  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const userInfoString = await AsyncStorage.getItem('userInfo');

      if (userInfoString !== null) {
        setUser(JSON.parse(userInfoString))
      }
    }
    getUser();
  }, [fladLG])


  const handleOnClick = (item) => {
    if (user != "") {
      navigation.navigate("Chọn ghế", { item, poster });
    } else {
      Alert.alert(
        'Thông báo', // Tiêu đề
        'Khách hàng chưa đăng nhập. Hãy đăng nhập để sử dụng chức năng đặt vé', // Nội dung
        [
          { text: 'Đồng ý', onPress: () => console.log('Đã đồng ý') },
          // Các nút tương tác khác có thể được thêm vào đây
        ],
        { cancelable: false }
      );
    }
  }

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}
      >
        <Text style={styles.headerText}>{newItem.rapName}</Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: "hidden",
        }}
      >
        {dataShow?.map((newItem, key) => (
          <TouchableOpacity
            key={key}
            style={styles.content}
            onPress={() => handleOnClick(newItem)}
          >
            <Text style={styles.text}>
              {String(new Date(newItem.showStart).getHours()).padStart(2, '0')}:{String(new Date(newItem.showStart).getMinutes()).padStart(2, '0')} - {String(new Date(newItem.showEnd).getHours()).padStart(2, '0')}:{String(new Date(newItem.showEnd).getMinutes()).padStart(2, '0')}
            </Text>
            {/* <View style={styles.separator} /> */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

function MovieSelected({ route }) {
  const codeMovie = route.params.codeMovie;
  const poster = route.params.poster;
  const fladLG = route.params.fladLG;
  // console.log(codeMovie);

  const [movieName, setMovieName] = useState("")
  const [startMovie, setStartMovie] = useState("");
  const [endMovie, setEndMovie] = useState("");
  const [showDate, setShowDate] = useState("");
  const [showStart, setShowStart] = useState("");

  const [listDataSource, setListDataSource] = useState([]);
  const [movieSelect, setMovieSelect] = useState("")
  const navigation = useNavigation();


  useEffect(() => {
    const getMovieSelect = async () => {
      await AsyncStorage.setItem('movieSelect', JSON.stringify({ codeMovie: codeMovie, poster: poster }));
    }
    getMovieSelect();
  }, [])

  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    setIsUpdating(!isUpdating);
  }, [showDate]);

  const handleOnClickDay = (date) => {
    // Đánh dấu rằng bạn muốn cập nhật trạng thái
    if (moment(date).format("YYYY-MM-DD") >= moment(new Date()).format("YYYY-MM-DD")) {
      const day = formatDateHandle(date);
      setShowDate(day);

    } else {
      Alert.alert(
        'Thông báo', // Tiêu đề
        'Ngày đã chọn nhỏ hơn ngày hiện tại.', // Nội dung
        [
          { text: 'Đồng ý', onPress: () => console.log('Đã đồng ý') },
          // Các nút tương tác khác có thể được thêm vào đây
        ],
        { cancelable: false }
      );

    }

  };


  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // const updateLayout = (index) => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   const array = [...listDataSource];
  //   array[index]["isExpanded"] = !array[index]["isExpanded"];
  //   setListDataSource(array);
  // };
  // Get movie by code
  useEffect(() => {
    axios
      .get(`http://${config.IPP4}:9000/cineza/api/v1/movie/` + codeMovie, {
        timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
      })
      .then((res) => {
        setStartMovie(res.data.startDate);
        setEndMovie(res.data.endDate);
        setMovieName(res.data.movieName)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //data start date and end date movie
  const datesWhitelist = [
    {
      start: startMovie,
      end: endMovie,
    },
  ];

  //Get rap by code movie and date
  useEffect(() => {
    const getRap = async () => {
      if (showDate != "") {
        const dataRaps = await axios.get(
          `http://${config.IPP4}:9000/cineza/api/v1/show/get-by-movie-date/${codeMovie}/${showDate}`
        );

        if (dataRaps.status === 200) {
          const seenIds = new Set();
          const resultArray = [];

          for (let item of dataRaps.data) {
            if (!seenIds.has(item.codeRap)) {
              seenIds.add(item.codeRap);
              resultArray.push(item);
            }
          }
          setListDataSource(resultArray);
        } else {
          console.log("error get rap by movie and data");
        }
      }
    };
    getRap();
  }, [showDate]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />
        <View style={{ paddingVertical: 10, backgroundColor: "#d1d1cf" }} />
        <View style={{ width: '100%', height: '10%', backgroundColor: "white", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
          <Text style={{ fontWeight: "600", fontSize: 20 }}>Tên phim: {movieName}</Text>
        </View>

        <CalendarStrip
          scrollable
          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          minDate={new Date()}
          startingDate={new Date()}
          maxDate={endMovie}
          scrollToOnSetSelectedDate={false}
          selectedDate={showDate ? showDate : ''}
          onDateSelected={handleOnClickDay}
          datesWhitelist={datesWhitelist}
          calendarColor={"black"}
          calendarHeaderStyle={{ color: "white" }}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          highlightDateNameStyle={{ color: "yellow" }}
          highlightDateNumberStyle={{ color: "yellow" }}
          daySelectionAnimation={{
            type: "border",
            duration: 1,
            borderWidth: 1,
            borderHighlightColor: "yellow",
          }}
          iconContainer={{ flex: 0.1 }}
        />

        <ScrollView>
          {listDataSource?.map((item, key) => (
            <ExpandableComponent
              key={item.rapName}
              // onClickFunction={() => {
              //   updateLayout(key);
              // }}
              fladLG={fladLG}
              newItem={item}
              poster={poster}
            />
          ))}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

export default MovieSelected;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#808080",
    width: "95%",
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    backgroundColor: "#fff",
    fontSize: 16,
    width: 'auto',
    color: "#606070",
    padding: 10,
    margin: 5,
    height: "auto",
    textAlign: "center",
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: "1%",
    backgroundColor: "#e3e1dc",
    alignContent: "center",
    alignItems: "center",
  },
});

