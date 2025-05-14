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
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },
    text: {
        fontSize: 12,
        color: '#666'
    }
});

export default Footer;