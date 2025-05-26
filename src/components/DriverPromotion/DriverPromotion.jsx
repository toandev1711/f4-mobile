// src/components/DriverPromotion.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ZoomOutEasyDown } from 'react-native-reanimated';

const DriverPromotion = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Trở thành đối tác tài xế</Text>
        <Text style={styles.subtitle}>Tăng thu nhập, thời gian linh hoạt.</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => alert('Đăng ký ngay')}>
        <Text style={styles.buttonText}>Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#5B21B6', // purple-900
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 20
  },
  title: { color: 'white', fontSize: 16 },
  subtitle: { color: 'white', fontSize: 12, marginTop: 8 },
  button: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 12, textAlign: 'center' },
});

export default DriverPromotion;
