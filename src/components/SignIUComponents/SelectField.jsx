import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectField = ({ value, onChange, options, error, style }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={[styles.pickerContainer, error ? styles.inputError : null]}>
                <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={styles.picker}
                >
                    {options.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    pickerContainer: {
        height: 44,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
    },
    picker: {
        height: 50,
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 12
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

export default SelectField;