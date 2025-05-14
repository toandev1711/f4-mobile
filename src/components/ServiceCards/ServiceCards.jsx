import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ServiceCards = () => {
  const handlePress = (cardName) => {
    Alert.alert(`Điều hướng đến ${cardName}`, `Chưa có trang cho ${cardName}. Vui lòng thêm logic điều hướng!`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => handlePress('Chở khách')}>
        <Image
          source={{ uri: 'https://i.imgur.com/FXxX9xH.png' }}
          style={styles.cardImage}
        />
        <Text style={styles.cardText}>Chở khách</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => handlePress('Chở hàng')}>
        <Image
          source={{ uri: 'https://i.imgur.com/lbF4VwN.png' }}
          style={styles.cardImage}
        />
        <Text style={styles.cardText}>Chở hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    marginTop: 10,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: { width: 48, height: 48, borderRadius: 24 },
  cardText: { marginTop: 8, color: '#444', fontSize: 12 },
});

export default ServiceCards;