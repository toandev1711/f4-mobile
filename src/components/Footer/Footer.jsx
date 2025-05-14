// src/components/Footer.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.bold}>F4Delivery</Text> - Đồng hành trên mọi nẻo đường.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 35, marginBottom: 50 },
  text: { fontSize: 14, color: '#5B21B6' },
  bold: { fontWeight: 'bold' },
});

export default Footer;