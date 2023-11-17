import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {formatDayHandle} from '../../util';

const data = [
  {name: 'a1'},
  {name: 'a2'},
  {name: 'a3'},
  {name: 'a4'},
  {name: 'a5'},
];
const RenderItem = ({item, handleClick}) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={styles.viewTicket}>
        <Text style={styles.viewText}>
          {formatDayHandle(item.bookAt)} {item.movieName} {item.rapName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
function TicketHistory() {
  const [dataTicket, setDataTicket] = useState([]);
  const navigation = useNavigation();

  const handleClick = item => {
    navigation.navigate('Chi tiết vé', {item});
  };
  //get ticket
  useEffect(() => {
    axios
      .get(`http://172.20.10.2:9000/cineza/api/v1/ticket/get-all/`, {
        timeout: 10000, // Tăng thời gian chờ lên 10 giây (mặc định là 5 giây)
      })
      .then(res => {
        setDataTicket(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingVertical: 10, backgroundColor: '#d1d1cf'}} />
      <View>
        <FlatList
          data={dataTicket}
          renderItem={({item}) => (
            <TouchableOpacity onPress={handleClick(item)}>
              <View style={styles.viewTicket}>
                <Text style={styles.viewText}>
                  {formatDayHandle(item.bookAt)} {item.movieName} {item.rapName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default TicketHistory;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  viewTicket: {
    // height: 50,
    paddingVertical: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1cf',
  },
  viewText: {
    fontSize: 18,
    paddingLeft: 15,
  },
});
