import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    welcome_container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    welcome_background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    welcome_title: {
        fontSize: 52,
        fontWeight: "bold",
        color: "#e2ebf7",
    },
    welcome_description: {
        marginTop: 10,
        fontSize: 18,
        color: "#97bef0",
        fontStyle: "italic"
    },

})

export default styles;