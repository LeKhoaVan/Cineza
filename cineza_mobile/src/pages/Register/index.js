import { View, Text, ImageBackground, Image, TextInput, ScrollView, TouchableOpacity } from "react-native"

import { backgroundWelcome, logo } from "../../constants/image"
import styles from "./styles";
import DatePicker from "react-native-date-picker";
import { useState } from "react";

const Register = () => {

    //show pich date
    const [showPickDate, setShowPickDate] = useState(false)
    // pick date
    const [date, setDate] = useState("")

    return <View style={styles.login_container}>
        <ImageBackground style={styles.login_background} resizeMode="cover" source={backgroundWelcome}>
            <View style={styles.login_header}>
                <Image source={logo} style={styles.login_header_logo} />
                <Text style={styles.login_header_title}>CineZa</Text>
            </View>

            <ScrollView style={styles.login_input}>
                <View>
                    <Text style={styles.login_input_label}>Họ Tên</Text>
                    <TextInput style={styles.login_input_input} />
                </View>
                <View>
                    <Text style={styles.login_input_label}>Số điện thoại</Text>
                    <TextInput style={styles.login_input_input} />
                </View>
                <View>
                    <Text style={styles.login_input_label}>Email</Text>
                    <TextInput style={styles.login_input_input} />
                </View>
                <View>
                    <Text style={styles.login_input_label}>Mật khẩu</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.login_input_input} />
                </View>
                <View>
                    <Text style={styles.login_input_label}>Xác nhận mật khẩu</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.login_input_input} />
                </View>
                <View>
                    <Text style={styles.login_input_label}>Ngày Sinh</Text>
                    <DatePicker
                        mode="date"
                        modal={true}
                        open={showPickDate}
                        date={new Date()}
                        maximumDate={new Date()}
                        style={{
                            color: "black",
                            marginHorizontal: 10
                        }}
                        onConfirm={(date) => {
                            setShowPickDate(false)
                            setDate(date.toLocaleDateString())
                        }}
                        onCancel={() => {
                            setShowPickDate(false)
                        }} />

                    <TouchableOpacity onPress={() => {
                        setShowPickDate(true)
                    }}>
                        <TextInput style={{
                            color: "black",
                            fontSize: 16,
                        }}
                            editable={false}
                            placeholder="2000-10-10"
                            value={date} />
                    </TouchableOpacity>
                </View>
                <View style={styles.login_button}>
                    <TouchableOpacity style={styles.login_button_btn}>
                        <Text style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: 20
                        }}>
                            Đăng Ký
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            alert("register")
                        }}
                    >
                        <Text style={{
                            color: "#614BC3",
                            textDecorationLine: "underline",
                            paddingBottom: 90
                        }}>
                            Bạn đã có tài khoản? Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    </View>
}

export default Register;