import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthLinks = ({ showGoogle, linkText, linkPress, extraLink }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {showGoogle && (
                <TouchableOpacity style={styles.googleButton}>
                    <Image
                        source={require("../../../assets/img/google.png")}
                        style={{ width: 30, height: 30 }}
                    />
                    <Text style={styles.googleText}>Đăng nhập bằng Google</Text>
                </TouchableOpacity>
            )}

            {extraLink && (
                <TouchableOpacity
                    style={styles.extraButton}
                    onPress={() => navigation.navigate(extraLink.route, { driverID: "0475662c-ace0-4cfb-8334-4c2e46d4119c" })}
                >
                    <Icon name={extraLink.icon} size={20} color="#eefafa" />
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
        borderWidth: 3,
        borderColor: '#c8f4cf',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        justifyContent: 'center',
        marginBottom: 8
    },
    googleText: {
        fontSize: 16,
        color: '#243d3a',
        marginLeft: 8
    },
    linkText: {
        fontSize: 16,
        color: '#03633e',
        textDecorationLine: 'underline',
        marginTop: 10
    },
    extraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
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