import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
    login_container: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    login_background: {
        flex: 1
    },

    login_header: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 40
    },

    login_header_logo: {
        borderRadius: 20,
        width: 60,
        height: 60
    },
    login_header_title: {
        paddingTop: 10,
        color: "white",
        fontSize: 26,
        fontWeight: "bold",
    },

    login_input: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
    },
    login_input_label: {
        paddingTop: 20,
        color: "black",
        fontWeight: "500",
        fontSize: 16
    },

    login_input_input: {
        color: "black",
        borderBottomColor: "#97bef0",
        borderBottomWidth: 1,
        borderStyle: "solid",
    },

    login_button: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    login_button_btn: {
        backgroundColor: "#012148",
        height: 50,
        width: 250,
        borderRadius: 30,
        justifyContent: "center",
        marginBottom: 20
    },


})

export default styles;