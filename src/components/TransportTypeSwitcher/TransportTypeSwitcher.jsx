// TransportTypeSwitcher.jsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TransportTypeSwitcher = ({ currentType, onTypeChange }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, currentType === 'passenger' && styles.activeButton, ]}
      onPress={() => onTypeChange('passenger')}
    >
      <Text style={[styles.buttonText, currentType === 'passenger' && styles.activeText]}>Chở khách</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
      style={[styles.button, currentType === 'cargo' && styles.activeButton]}
      onPress={() => onTypeChange('cargo')}
    >
      <Text style={[styles.buttonText, currentType === 'cargo' && styles.activeText]}>Chở hàng</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: '#f1f2f6',
    borderRadius: 12,
    padding: 4,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#02b34f',
    elevation: 3,
  },
  buttonText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  activeText: {
    color: '#2d3436',
  },
});

export default TransportTypeSwitcher;
