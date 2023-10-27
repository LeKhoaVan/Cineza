import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerText: {
    height: 100,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  containerInput: {
    // flex: 0.4,
    marginTop: 30,
  },
  item: {
    // display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#DCDCDC",
    alignItems: "center",
  },
  textInput: {
    marginLeft: 15,
    height: 50,
    fontSize: 22,
    // flex: 0.85,
  },
  containerBottom: {
    // flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    // display: "flex",
    flexDirection: "row",
  },
  btnRegister: {
    // display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    // paddingRight: 10,
    marginTop: 20,
  },
  bottom: {
    // flex: 1,
    width: "90%",
    height: 60,
    backgroundColor: "#1C86EE",
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
