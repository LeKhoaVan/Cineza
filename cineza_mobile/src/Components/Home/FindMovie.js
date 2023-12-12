import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function FindMovie() {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                placeholder="Tìm kiếm..."
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        margin: 10,
        padding: 5,
        elevation: 2,
    },
    searchIcon: {
        paddingRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#000',
    },
});

export default FindMovie