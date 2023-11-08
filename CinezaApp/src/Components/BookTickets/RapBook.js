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
import Header from "../Header/Header";
import { useNavigation } from "@react-navigation/native";

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
            onPress={() => handleClick(item)}
          >
            <Text style={styles.text}>{item.val}</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

function BookByRap() {
  const [listDataSource, setListDataSource] = useState(data);
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Chọn phim", item);
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
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text style={styles.titleText}>Chọn Rạp</Text>
        </View>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              handleClick={handleClick}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default BookByRap;
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
    fontSize: 16,
    color: "#606070",
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#e3e1dc",
  },
});

const data = [
  {
    category_name: "Hồ Chí Minh",
    subcategory: [
      { id: 1, val: "CGV Vincom Gò Vấp" },
      { id: 2, val: "CGV Hoàng Văn Thụ" },
      { id: 3, val: "CGV Pandora City" },
      { id: 4, val: "CGV Aeon Tân Phú" },
      { id: 5, val: "CGV Pearl Plaza" },
    ],
  },
  {
    category_name: "Bình Dương",
    subcategory: [
      { id: 6, val: "CGV Aeon Canary" },
      { id: 7, val: "CGV Bình Dương Square" },
    ],
  },
  {
    category_name: "Đồng Nai",
    subcategory: [
      { id: 8, val: "CGV Big C Đồng Nai" },
      { id: 9, val: "CGV Coopmart Biên Hòa" },
    ],
  },
  {
    category_name: "Tiền Giang",
    subcategory: [
      { id: 10, val: "CGV Vincom Mỹ Tho" },
      { id: 11, val: "CGV GO! Mỹ Tho" },
    ],
  },
  {
    category_name: "Bà Rịa-Vũng Tàu",
    subcategory: [
      { id: 12, val: "CGV Lapen Center Vũng Tàu" },
      { id: 13, val: "CGV Lam Sơn Square" },
    ],
  },
  {
    category_name: "Cần Thơ",
    subcategory: [
      { id: 14, val: "CGV Vincom Hùng Vương" },
      { id: 15, val: "CGV Sense City" },
      { id: 16, val: "CGV Vincom Xuân Khánh" },
    ],
  },
  {
    category_name: "Đã Nẵng",
    subcategory: [
      { id: 17, val: "CGV Vĩnh Trung Plaza" },
      { id: 18, val: "CGV Vincom Đà Nẵng" },
    ],
  },
  {
    category_name: "Hải Phòng",
    subcategory: [
      { id: 19, val: "CGV Aeon Mall Hải Phòng" },
      { id: 20, val: "CGV Vincom Hải Phòng" },
    ],
  },
  {
    category_name: "Quảng Ninh",
    subcategory: [
      { id: 21, val: "CGV Vincom Hạ Long" },
      { id: 22, val: "CGV Vincom Cẩm Phả" },
    ],
  },
  {
    category_name: "Hà Nội",
    subcategory: [
      { id: 23, val: "CGV Hồ Gươm Plaza" },
      { id: 24, val: "CGV Vincom Ocean Park" },
      { id: 25, val: "CGV Aeon Hà Đông" },
      { id: 26, val: "CGV Xuân Diệu" },
      { id: 27, val: "CGV Sun Grand Lương Yên" },
    ],
  },
  {
    category_name: "Phú Thọ",
    subcategory: [{ id: 28, val: "CGV Happyland Việt Trì" }],
  },
  {
    category_name: "Thái Nguyên",
    subcategory: [{ id: 29, val: "CGV Vincom Thái Nguyên" }],
  },
];
