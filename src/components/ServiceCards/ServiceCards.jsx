import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ServiceCards = () => {
  const navigation = useNavigation()
  const handlePress = () => {
    navigation.navigate("Transport")
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Icon name="car" size={32} color="#7C3AED" style={styles.itemImage} />
        <Text style={styles.itemText}>Đặt xe ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F5F5F5',
    marginTop: 10,
    // Optional: để fill space nếu muốn
    flex: 1,
  },
  card: {
    flex: 1, // fill rộng
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
  itemImage: {
    marginBottom: 8,
  },
  itemText: {
    marginTop: 8,
    color: '#444',
    fontSize: 12,
  },
});

export default ServiceCards;