import { StyleSheet } from "react-native";

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
    height: 100,
  },
  description: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 20,
    height: 50,
  },
  year: {
    fontSize: 20,
  },
});

export default styles;
