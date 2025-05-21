// VehicleCard.jsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const VehicleCard = ({ title, price, description, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.container, selected && styles.selectedContainer]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    
    <View style={[styles.radioCircle, selected && styles.selectedRadio]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  selectedContainer: {
    borderColor: '#00b14f',
    backgroundColor: '#f5fcff',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  price: {
    fontSize: 14,
    color: '#00b14f',
    marginVertical: 4,
  },
  description: {
    fontSize: 12,
    color: '#636e72',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#b2bec3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    borderColor: '#00b14f',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00b14f',
  },
});

export default VehicleCard;
