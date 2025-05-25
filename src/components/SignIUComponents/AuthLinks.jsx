import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AuthLinks = ({ showGoogle, linkText, linkPress, extraLink }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {showGoogle && (
                <TouchableOpacity style={styles.googleButton}>
                    <Icon name="google" size={20} color="#333" />
                    <Text style={styles.googleText}>Đăng nhập bằng Google</Text>
                </TouchableOpacity>
            )}

            {extraLink && (
                <TouchableOpacity
                    style={styles.extraButton}
                    onPress={() => navigation.navigate(extraLink.route, { driverID: "0475662c-ace0-4cfb-8334-4c2e46d4119c" })}
                >
                    <Icon name={extraLink.icon} size={20} color="#6B46C1" />
                    <Text style={styles.extraText}>{extraLink.text}</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={linkPress}>
                <Text style={styles.linkText}>{linkText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 12
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        marginBottom: 8
    },
    googleText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 8
    },
    linkText: {
        fontSize: 14,
        color: '#6B46C1',
        textDecorationLine: 'underline',
        marginTop: 10
    },
    extraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6B46C1',
        borderRadius: 999,
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        marginTop: 8
    },
    extraText: {
        fontSize: 14,
        color: '#6B46C1',
        marginLeft: 8
    }
});

export default AuthLinks;