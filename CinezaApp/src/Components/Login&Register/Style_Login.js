import { Platform, StatusBar, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  containerText: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  containerInput: {
    flex: 0.4,
    justifyContent: "center",
  },
  containerBottom: {
    flex: 0.1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 10,
  },
  bottom: {
    flex: 1,
    height: 60,
    backgroundColor: "#1C86EE",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
});

export default styles;
