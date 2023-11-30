import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ProfileDetail() {
  const navigation = useNavigation();
  const [user, setUser] = useState("")
  useEffect(() => {
    const getUser = async () => {
      const userInfoString = await AsyncStorage.getItem('userInfo');

      if (userInfoString !== null) {
        setUser(JSON.parse(userInfoString))
      }
    }
    getUser();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.content}>
        <Text style={{ fontSize: 18, paddingLeft: 5, color: '#8c8f67' }}>
          Tài khoản Email
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 600, paddingLeft: 5 }}>
          {user.numberPhone}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={{ fontSize: 18, paddingLeft: 5, color: '#8c8f67' }}>
          Thông tin thêm
        </Text>
      </View>
      <View style={{}}>
        <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.viewText}>Họ tên</Text>
            <TextInput
              style={{ fontSize: 18, paddingRight: 15 }}
              value={user.userName}></TextInput>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.viewText}>Ngày sinh</Text>
            <TextInput
              style={{ fontSize: 18, paddingRight: 15 }}
              value={moment(user.dateOfBirth).format("DD-MM-YYYY")}></TextInput>
          </View>
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={{ fontSize: 18, paddingLeft: 5, color: '#8c8f67' }}>
            Liên hệ
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.viewText}>Số điện thoại</Text>
            <TextInput
              style={{ fontSize: 18, paddingRight: 15 }}
              value="null"></TextInput>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.viewText}>Tỉnh/thành</Text>
            <Text style={{ fontSize: 18, paddingRight: 15 }}>{user.cityAddress}</Text>
          </View>
        </TouchableOpacity> */}
      </View>
      <View>
        <TouchableOpacity style={styles.bottom}>
          <Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold' }}>
            Cập nhật thông tin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfileDetail;

const styles = StyleSheet.create({
  iconCamera: {
    position: 'absolute',
    top: -30,
    right: -70,
    backgroundColor: '#fff',
    borderRadius: 80,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#d1d1cf',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1cf',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  viewText: {
    fontSize: 18,
    paddingLeft: 15,
  },
  bottom: {
    height: 50,
    backgroundColor: '#940a11',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 50,
  },
});
