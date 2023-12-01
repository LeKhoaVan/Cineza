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

function Item4dx() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        src="https://ocwckgy6c1obj.vcdn.cloud/media/imax/4DX_2.png"
        style={styles.image}
      />
      <View style={{ overflow: "hidden", alignItems: "flex-start" }}>
        <Text style={styles.text}>
          Với dịch vụ vé thường, Rạp Chiếu Phim cam kết mang lại trải nghiệm xem phim đầy đủ, thoải mái và truyền cảm hứng cho khán giả.
          Dưới đây là mô tả chi tiết về dịch vụ vé thường mà chúng tôi cung cấp
        </Text>
        <View style={{ height: 10 }} />
        <Text style={styles.text}>Đặc Trưng Nổi Bật Của Vé Thường</Text>
        <Text style={styles.text}>
          - Đa dạng lựa chọn phim: Với danh sách phim đa dạng và đầy đủ thể loại, khán giả vé thường có cơ hội
          lựa chọn giữa nhiều bộ phim mới nhất và các tác phẩm kinh điển.
        </Text>
        <Text style={styles.text}>
          - Giờ chiếu linh hoạt: Lịch chiếu phong phú, phù hợp với nhiều thời điểm khác nhau trong ngày, từ buổi sáng sớm đến khuya muộn,
          tạo thuận lợi cho khán giả có thời gian linh động..{" "}
        </Text>
        <Text style={styles.text}>
          - Giá cả hợp lý: Vé thường được thiết kế với giá cả hợp lý, giúp mọi người dễ dàng tiếp cận và thưởng thức trải nghiệm xem phim mà
          không làm ảnh hưởng đến ngân sách cá nhân.
        </Text>
        <Text style={styles.text}>
          - Hệ thống âm thanh ánh sáng
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Item4dx;

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
