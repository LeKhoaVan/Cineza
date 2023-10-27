import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  bookTicket: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 40,
    width: 300,
    textAlign: "center",
    color: "white",
  },
  containerOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    height: 120,
    width: 120,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#808080",
    width: "90%",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 10,
  },
});

export default styles;
