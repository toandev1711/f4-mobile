import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputField = ({ type, placeholder, value, onChangeText, error, secureTextEntry, editable, icon, style }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, error ? styles.inputError : null]}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={type === 'email' ? 'email-address' : type === 'number' ? 'numeric' : 'default'}
                    editable={editable}
                />
                {icon && <Icon name={icon} size={20} color="#6B46C1" style={styles.icon} />}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 12
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#FFFFFF'
    },
    input: {
        flex: 1,
        height: 44,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333'
    },
    inputError: {
        borderColor: '#EF4444'
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4
    },
    icon: {
        marginRight: 12
    }
});

export default InputField;