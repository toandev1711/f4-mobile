import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = ({ title, onPress, loading }) => {
    return (
        <TouchableOpacity
            style={[styles.button, loading ? styles.buttonDisabled : null]}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.7} // Hiệu ứng mờ khi nhấn
        >
            {loading ? (
                <ActivityIndicator color="#FFFFFF" />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#5cbaa2', // Màu nền chính
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#4dbccf',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#b3ecff',
        borderColor: '#ffd3ae',
        shadowOpacity: 0.1,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Button;