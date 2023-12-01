import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    SafeAreaView,
} from "react-native";
import { useState } from "react";

function SweetBoxPage() {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEObG0r2zsvYxxXHdizht_GGPMjjBo78V3MA&usqp=CAU"
                style={styles.image}
            />
            <View style={{ overflow: "hidden", alignItems: "flex-start" }}>
                <Text style={styles.text}>
                    Với Dịch Vụ Vé VIP, Rạp Chiếu Phim mang đến một trải nghiệm xem phim cao cấp và sang trọng, nơi khán giả được tận hưởng sự thoải mái, chăm sóc cá nhân và không gian riêng tư.
                    Dưới đây là mô tả chi tiết về dịch vụ vé VIP mà chúng tôi cung cấp:
                </Text>
                <View style={{ height: 10 }} />
                <Text style={styles.text}>Đặc Trưng Nổi Bật Của Vé VIP</Text>
                <Text style={styles.text}>
                    - Ghế VIP: Ghế VIP được thiết kế đặc biệt với chất liệu cao cấp, kích thước lớn hơn và gối hỗ trợ,
                    tạo nên sự thoải mái tối đa và trải nghiệm xem phim không giới hạn.
                </Text>
                <Text style={styles.text}>
                    - Dịch vụ: Nhân viên phục vụ đồ uống và thức ăn nhanh đến tận ghế,
                    tạo sự thuận lợi và thoải mái cho khán giả không cần phải di chuyển..{" "}
                </Text>
                <Text style={styles.text}>
                    -Không gian riêng tư: Phòng chiếu VIP được thiết kế với không gian riêng tư,
                    giúp khán giả tránh xa sự quấy rối và tận hưởng không khí thư giãn..
                </Text>
                <Text style={styles.text}>
                    - Vị trí ngồi: Với vé VIP, khán giả có ưu tiên chọn ghế và mua vé trước,
                    đảm bảo một vị trí tốt nhất trong phòng chiếu.
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default SweetBoxPage;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        display: "flex",
        flex: 1,
        flexDirection: "column",
    },
    image: {
        height: 200,
    },
    text: {
        color: "#8c8f67",
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
    },
});
