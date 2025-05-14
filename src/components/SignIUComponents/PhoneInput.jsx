import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const PhoneInput = ({ value, onChangeText, error }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
                value={value}
                onChangeText={onChangeText}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: '#FFFFFF'
    },
    inputError: {
        borderColor: '#EF4444'
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4
    }
});

export default PhoneInput;