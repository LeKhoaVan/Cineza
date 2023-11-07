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
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { useNavigation } from "@react-navigation/native";
import Header from "../Header/Header";
import axios from "axios";
import { formatDateHandle, formatTimeHandle } from "../../util";

const ExpandableComponent = ({ newItem, onClickFunction, handleClick }) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    if (newItem.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [newItem.isExpanded]);

  useEffect(() => {
    const getDataShow = async () => {
      const response = await axios.get(
        `http://172.20.10.2:9000/cineza/api/v1/show/get-by-rap-movie-data/${
          newItem.codeRap
        }/${newItem.codeMovie}/${formatDateHandle(newItem.showStart)}`
      );
      if (response.status === 200) {
        setDataShow(response.data);
        // console.log("test getdataShow: " + response.data);
      } else {
        console.log("error get data show");
      }
    };
    getDataShow();
  }, []);

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
            onPress={handleClick}
          >
            <Text style={styles.text}>
              {formatTimeHandle(newItem.showStart)}
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
  // console.log(codeMovie);

  const [startMovie, setStartMovie] = useState("");
  const [endMovie, setEndMovie] = useState("");
  const [showDate, setShowDate] = useState("");
  const [showStart, setShowStart] = useState("");

  const [listDataSource, setListDataSource] = useState([]);
  const navigation = useNavigation();

  // const onChangeHandleShowDate = (date) => {
  //   const day = formatDateHandle(date);
  //   // setShowDate(day);
  //   console.log(day);
  //   console.log(codeMovie);
  // };

  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    setIsUpdating(!isUpdating);
    console.log(showDate);
  }, [showDate]);

  const handleOnClickDay = (date) => {
    // console.log(date);
    // Đánh dấu rằng bạn muốn cập nhật trạng thái
    const day = formatDateHandle(date);
    setShowDate(day);
  };

  const handleClick = (item) => {
    navigation.navigate("Chọn ghế", { item });
  };

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    array[index]["isExpanded"] = !array[index]["isExpanded"];
    setListDataSource(array);
  };

  // Get movie by code
  useEffect(() => {
    axios
      .get(`http://172.20.10.2:9000/cineza/api/v1/movie/` + codeMovie, {
        timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
      })
      .then((res) => {
        setStartMovie(res.data.startDate);
        setEndMovie(res.data.endDate);
        console.log(res.data.startDate);
        console.log(res.data.endDate);
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
          `http://172.20.10.2:9000/cineza/api/v1/show/get-by-movie-date/${codeMovie}/${showDate}`
        );

        if (dataRaps.status === 200) {
          const seenIds = new Set();
          const resultArray = [];

          for (const item of dataRaps.data) {
            if (!seenIds.has(item.codeRap)) {
              seenIds.add(item.codeRap);
              resultArray.push(item);
            }
          }
          // console.log(resultArray);
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
        <CalendarStrip
          // numDaysInWeek={7}
          scrollable
          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          minDate={startMovie}
          maxDate={endMovie}
          scrollToOnSetSelectedDate={false}
          selectedDate={showDate ? showDate : "2023-12-12"}
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
              onClickFunction={() => {
                updateLayout(key);
                // console.log("test item: " + item.code);
              }}
              handleClick={() => {
                handleClick(item);
              }}
              newItem={item}
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
    color: "#606070",
    padding: 10,
    margin: 5,
    width: 70,
    height: "auto",
    textAlign: "center",
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#e3e1dc",
    alignContent: "center",
    alignItems: "center",
  },
});

const data = [
  {
    category_name: "CGV Vincom Gò Vấp",
    subcategory: [
      { id: 1, val: "18:00" },
      { id: 2, val: "19:00" },
      { id: 3, val: "20:00" },
      { id: 4, val: "21:00" },
      { id: 5, val: "22:00" },
    ],
  },
  {
    category_name: "CGV Hoàng Văn Thụ",
    subcategory: [
      { id: 6, val: "18:00" },
      { id: 7, val: "19:00" },
    ],
  },
  {
    category_name: "CGV Pandora City",
    subcategory: [
      { id: 8, val: "18:00" },
      { id: 9, val: "19:00" },
    ],
  },
  {
    category_name: "CGV Aeon Tân Phú",
    subcategory: [
      { id: 10, val: "18:00" },
      { id: 11, val: "19:00" },
    ],
  },
  {
    category_name: "CGV Lam Sơn Square",
    subcategory: [
      { id: 12, val: "18:00" },
      { id: 13, val: "19:00" },
    ],
  },
  {
    category_name: "CGV Sense City",
    subcategory: [
      { id: 14, val: "18:00" },
      { id: 15, val: "19:00" },
      { id: 16, val: "20:00" },
    ],
  },
  {
    category_name: "CGV Vĩnh Trung Plaza",
    subcategory: [
      { id: 17, val: "18:00" },
      { id: 18, val: "19:00" },
    ],
  },
  {
    category_name: "CGV Pearl Plaza",
    subcategory: [
      { id: 19, val: "18:00" },
      { id: 20, val: "19:00" },
    ],
  },
  {
    category_name: "CGV Aeon Hà Đông",
    subcategory: [
      { id: 21, val: "18:00" },
      { id: 22, val: "19:00" },
    ],
  },
  {
    category_name: "CGV Vincom Ocean Park",
    subcategory: [
      { id: 23, val: "17:00" },
      { id: 24, val: "18:00" },
      { id: 25, val: "19:00" },
      { id: 26, val: "20:00" },
      { id: 27, val: "22:00" },
    ],
  },
  {
    category_name: "CGV Sun Grand Lương Yên",
    subcategory: [{ id: 28, val: "19:00" }],
  },
];
