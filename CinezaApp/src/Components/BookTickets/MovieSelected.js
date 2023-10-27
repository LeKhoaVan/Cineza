import React, { useEffect, useState } from "react";
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

const ExpandableComponent = ({ item, onClickFunction, handleClick }) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}
      >
        <Text style={styles.headerText}>{item.category_name}</Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: "hidden",
        }}
      >
        {item.subcategory.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={styles.content}
            onPress={handleClick}
          >
            <Text style={styles.text}>{item.val}</Text>
            {/* <View style={styles.separator} /> */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

function MovieSelected() {
  const [listDataSource, setListDataSource] = useState(data);
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("SeatBook", item);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />
        <View style={{ paddingVertical: 10, backgroundColor: "#d1d1cf" }} />
        <CalendarStrip
          scrollable
          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          calendarColor={"black"}
          calendarHeaderStyle={{ color: "white" }}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          highlightDateNameStyle={{ color: "yellow" }}
          highlightDateNumberStyle={{ color: "yellow" }}
          iconContainer={{ flex: 0.1 }}
        />

        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              handleClick={() => {
                handleClick(item);
              }}
              item={item}
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
