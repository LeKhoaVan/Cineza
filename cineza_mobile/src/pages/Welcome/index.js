import { View, Text, ImageBackground } from "react-native"

import { backgroundWelcome } from "../../constants/image"
import styles from "./styles";
const Welcome = () => {
    return <View style={styles.welcome_container}>
        <ImageBackground style={styles.welcome_background} resizeMode="stretch" source={backgroundWelcome}>
            <Text style={styles.welcome_title}>Cineza</Text>
            <Text style={styles.welcome_description}>Hệ thống đặt vé xem phim</Text>
        </ImageBackground>
    </View>
}

export default Welcome;