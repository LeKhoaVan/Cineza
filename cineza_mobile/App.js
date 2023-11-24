import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import iconHome from './src/assets/imageButton/iconHome.png';
const Stack = createStackNavigator();

import Home from './src/Components/Home/Home';
import UserProfile from './src/Components/Profile/UserProfile';
import Menu from './src/Components/Menu/Menu';
import BookByMovie from './src/Components/BookTickets/MovieBook';
import BookByRap from './src/Components/BookTickets/RapBook';
import MovieSelected from './src/Components/BookTickets/MovieSelected';
import RapSelected from './src/Components/BookTickets/RapSelected';
import MovieDetail from './src/Components/Movie/MovieDetail';
import Login from './src/Components/Login&Register/Login';
import Register from './src/Components/Login&Register/Register';
import ForgetPassword from './src/Components/Login&Register/ForgetPassword';
import ModifyPassword from './src/Components/Login&Register/ModifyPassword';
import SeatBook from './src/Components/Seat/SeatBook';
import OtherProduct from './src/Components/OtherProduct/OtherProduct';
import PayScreen from './src/Components/PayScreen/PayScreen';
import ChangePassword from './src/Components/Profile/ChangePassword';
import ProfileDetail from './src/Components/Profile/ProfileDetail';
import TicketHistory from './src/Components/Profile/TicketHistory';
import TicketDetail from './src/Components/Profile/TicketDetail';
import Order from './src/Components/Order/Order';
import Item4dx from './src/Components/Home/Item4dx';
import OTPAuthScreen from "./src/Components/Login&Register/OTPAuthScreen"
export default function App() {
  const home = 'Home';
  const menu = 'Menu';
  const byMovie = 'Danh sách phim';
  const byRap = 'Danh sách rạp';
  const movieSelected = 'Chọn rạp';
  const rapSelected = 'Chọn phim';
  const movieDetail = 'Thông tin phim';
  const login = 'Đăng nhập';
  const register = 'Đăng ký';
  const forget = 'Quên mật khẩu';
  const modify = 'Đổi mật khẩu';
  const seatBook = 'Chọn ghế';
  const otherProduct = 'Đồ đi kèm';
  const payScreen = 'Thanh toán';
  const userProfile = 'Thành viên';
  const changePassword = 'Thay đổi mật khẩu';
  const profileDetail = 'Thông tin tài khoản';
  const ticketHistory = 'Lịch sử vé';
  const ticketDetail = 'Chi tiết vé';
  const item4dx = '4DX';
  const order = 'Hóa đơn';
  const conform = "Xác thực";
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
          component={MovieSelected}></Stack.Screen>
        <Stack.Screen name={rapSelected} component={RapSelected}></Stack.Screen>
        <Stack.Screen name={movieDetail} component={MovieDetail}></Stack.Screen>
        <Stack.Screen name={login} component={Login}></Stack.Screen>
        <Stack.Screen name={register} component={Register}></Stack.Screen>
        <Stack.Screen name={conform} component={OTPAuthScreen}></Stack.Screen>
        <Stack.Screen name={forget} component={ForgetPassword}></Stack.Screen>
        <Stack.Screen name={modify} component={ModifyPassword}></Stack.Screen>
        <Stack.Screen name={seatBook} component={SeatBook}></Stack.Screen>
        <Stack.Screen
          name={otherProduct}
          component={OtherProduct}></Stack.Screen>
        <Stack.Screen name={payScreen} component={PayScreen}></Stack.Screen>
        <Stack.Screen
          name={changePassword}
          component={ChangePassword}></Stack.Screen>
        <Stack.Screen
          name={profileDetail}
          component={ProfileDetail}></Stack.Screen>
        <Stack.Screen
          name={ticketHistory}
          component={TicketHistory}></Stack.Screen>
        <Stack.Screen
          name={ticketDetail}
          component={TicketDetail}></Stack.Screen>
        <Stack.Screen name={item4dx} component={Item4dx}></Stack.Screen>
        <Stack.Screen name={order} component={Order}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}>
                <Image source={iconHome} style={{ marginLeft: 5, width: 35, height: 35, tintColor: "black" }} />
              </TouchableOpacity>
            ),
          })} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
