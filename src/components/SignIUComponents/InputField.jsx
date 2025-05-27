import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Animated,
    Text,
    StyleSheet,
    Platform
} from 'react-native';

const InputField = ({
    label,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    editable = true,
    error = '',
    style
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const animated = useState(new Animated.Value(value ? 1 : 0))[0];

    useEffect(() => {
        Animated.timing(animated, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute',
        left: 12, // Giảm left để phù hợp với ô nhỏ hơn
        paddingHorizontal: 4, // Giảm paddingHorizontal
        backgroundColor: '#fff',
        top: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [14, -10],
        }),
        fontSize: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 10], // Giảm fontSize của nhãn
        }),
        color: error ? '#EF4444' : isFocused ? '#4dbccf' : '#5cbaa2',
        fontWeight: '600',
        fontSize: 14,
    };

    return (
        <View style={[styles.container, style]}>
            <View
                style={[
                    styles.inputWrapper,
                    {
                        borderColor: error
                            ? 'red'
                            : isFocused
                                ? '#5cbaa2'
                                : '#4dbccf',
                    },
                ]}
            >
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    editable={editable}
                    placeholder=""
                />
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    inputWrapper: {
        position: 'relative',
        borderWidth: 1.2,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 8,
        backgroundColor: '#fff',
    },
    input: {
        fontSize: 20,
        color: '#111',
        height: 32,
        paddingVertical: 0,
        paddingHorizontal: 0,
        textAlignVertical: 'center',
        fontWeight: '500',
        includeFontPadding: false,
    },
    error: {
        color: '#EF4444',
        fontSize: 14,
        marginTop: 8
    },
});

export default InputField;