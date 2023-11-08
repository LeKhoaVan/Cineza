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
          4DX®, một định dạng điện ảnh hoàn toàn mới đánh thức mọi giác quan của
          khán giả mang đến những trải nghiệm điện ảnh tuyệt đỉnh bằng công nghệ
          hiện đại nhất trên thế giới.
        </Text>
        <View style={{ height: 10 }} />
        <Text style={styles.text}>Đặc Trưng Nổi Bật Của 4DX® </Text>
        <Text style={styles.text}>
          - 4DX® mang đến cho khán giả hai loại hiệu ứng: hiệu ứng ghế chuyển
          động đa chiều và hiệu ứng môi trường tương tác xung quanh.
        </Text>
        <Text style={styles.text}>
          - Ghế 4D bao gồm 3 kiểu chuyển động cơ bản: Xoay, rung lắc và nâng.
          Các chuyển động này được kết hợp để tạo ra cảm giác sống động vượt
          trội.{" "}
        </Text>
        <View style={{ height: 10 }} />
        <Text style={styles.text}>Các Hiệu Ứng Đặc Trưng Của 4DX® </Text>
        <Text style={styles.text}>
          - Chuyển động: Ghế chuyển động đa chiều cho phản ứng chân thực với các
          tác động từ màn ảnh.{" "}
        </Text>
        <Text style={styles.text}>
          - Nước: Thiết bị phun nước đặc biệt mang lại những trải nghiệm điện
          ảnh sống động.{" "}
        </Text>
        <Text style={styles.text}>
          - Gió: Hệ thống “Phun khí cổ” được cài đặt trên ghế thổi luồng gió
          trực tiếp lên cổ.{" "}
        </Text>
        <Text style={styles.text}>
          - Mùi Hương: Chìm đắm vào không gian trong mỗi cảnh phim với trải
          nghiệm mùi Hương chân thật.{" "}
        </Text>
        <Text style={styles.text}>
          - Ánh sáng: Hiệu ứng ánh sáng đặc biệt tạo tia chớp được lắp đặt ngay
          bên trên trần khán phòng.
        </Text>
        <View style={{ height: 10 }} />
        <Text style={styles.text}>
          Những Điều Cần Biết Khi Thưởng Thức 4DX®{" "}
        </Text>
        <Text style={styles.text}>
          - Trẻ em dưới 4 tuổi hoặc cao dưới 1 mét không được sử dụng ghế 4DX®.
          Trẻ em dưới 7 tuổi phải có bố mẹ hoặc người lớn đi kèm.{" "}
        </Text>
        <Text style={styles.text}>
          - Phụ nữ đang mang thai, người già, người có thể chất và thần kinh yếu
          không nên sử dụng ghế 4DX®.{" "}
        </Text>
        <Text style={styles.text}>
          - Không để trẻ nhỏ ngồi ghế nâng hoặc ngồi chung với bố mẹ. 4DX®.{" "}
        </Text>
        <Text style={styles.text}>
          - Không để trẻ nhỏ ngồi ghế nâng hoặc ngồi chung với bố mẹ.
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
