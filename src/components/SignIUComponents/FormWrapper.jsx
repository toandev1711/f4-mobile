import React from 'react';
import { View, StyleSheet } from 'react-native';

const FormWrapper = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    }
});

export default FormWrapper;