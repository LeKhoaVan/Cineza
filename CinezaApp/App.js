import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

import Home from "./src/Components/Home/Home";
import UserProfile from "./src/Components/Profile/UserProfile";
import Menu from "./src/Components/Menu/Menu";
import BookByMovie from "./src/Components/BookTickets/MovieBook";
import BookByRap from "./src/Components/BookTickets/RapBook";
import MovieSelected from "./src/Components/BookTickets/MovieSelected";
import RapSelected from "./src/Components/BookTickets/RapSelected";
import MovieDetail from "./src/Components/Movie/MovieDetail";
import Login from "./src/Components/Login&Register/Login";
import Register from "./src/Components/Login&Register/Register";
import SeatBook from "./src/Components/Seat/SeatBook";
import OtherProduct from "./src/Components/OtherProduct/OtherProduct";
import PayScreen from "./src/Components/PayScreen/PayScreen";
import ChangePassword from "./src/Components/Profile/ChangePassword";
export default function App() {
  const home = "Home";
  const menu = "Menu";
  const byMovie = "BookByMovie";
  const byRap = "BookByRap";
  const movieSelected = "MovieSelected";
  const rapSelected = "RapSelected";
  const movieDetail = "MovieDetail";
  const login = "Login";
  const register = "Register";
  const seatBook = "SeatBook";
  const otherProduct = "OtherProduct";
  const payScreen = "PayScreen";
  const userProfile = "Thành viên";
  const changePassword = "Đổi mật khẩu";
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={home} component={Home}></Stack.Screen>
        <Stack.Screen name={userProfile} component={UserProfile}></Stack.Screen>
        <Stack.Screen name={menu} component={Menu}></Stack.Screen>
        <Stack.Screen name={byMovie} component={BookByMovie}></Stack.Screen>
        <Stack.Screen name={byRap} component={BookByRap}></Stack.Screen>
        <Stack.Screen
          name={movieSelected}
          component={MovieSelected}
        ></Stack.Screen>
        <Stack.Screen name={rapSelected} component={RapSelected}></Stack.Screen>
        <Stack.Screen name={movieDetail} component={MovieDetail}></Stack.Screen>
        <Stack.Screen name={login} component={Login}></Stack.Screen>
        <Stack.Screen name={register} component={Register}></Stack.Screen>
        <Stack.Screen name={seatBook} component={SeatBook}></Stack.Screen>
        <Stack.Screen
          name={otherProduct}
          component={OtherProduct}
        ></Stack.Screen>
        <Stack.Screen name={payScreen} component={PayScreen}></Stack.Screen>
        <Stack.Screen
          name={changePassword}
          component={ChangePassword}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
