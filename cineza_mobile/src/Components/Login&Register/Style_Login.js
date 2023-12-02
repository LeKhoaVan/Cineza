import { Platform, StatusBar, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  containerText: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  containerInput: {
    marginTop: "5%",
    flex: 0.4,
    justifyContent: "center",
  },
  containerBottom: {
    flex: 0.1,
    marginTop: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 10,
  },
  bottom: {
    display: "flex",
    flex: 1,
    height: 60,
    backgroundColor: "#940a11",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  btnError: {
    display: "flex",
    flex: 1,
    height: 60,
    backgroundColor: "gray",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  error: {
    color: "red",
    fontSize: 20,
    marginLeft: 10,
  },
});

export default styles;
