import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>© 2025 f4delivery.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        fontStyle: 'italic'
    },
    text: {
        fontSize: 14,
        color: '#666'
    }
});

export default Footer;