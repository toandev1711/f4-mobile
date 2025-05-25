import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ currentStep, steps }) => {
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.stepText}>{steps[currentStep - 1]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    progressContainer: {
        height: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        overflow: 'hidden'
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#6B46C1'
    },
    stepText: {
        marginTop: 8,
        fontSize: 14,
        color: '#333',
        textAlign: 'center'
    }
});

export default ProgressBar;