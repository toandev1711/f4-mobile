import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CircleAvatar from '../CircleAvatar/CircleAvtar';

const Header = ({ welcomeText }) => {
    return (
        <View style={styles.container}>
            <View className="items-center justify-center mb-6">
                <CircleAvatar />
            </View>
            <Text style={styles.welcomeText}>{welcomeText}</Text>
            <Text style={styles.brandText}>F4DELIVERY</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 24 // Giảm từ 50
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 12
    },
    welcomeText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center'
    },
    brandText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6B46C1'
    }
});

export default Header;