import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { CreditCardIcon, GiftIcon, MapPinIcon, ClockIcon } from 'react-native-heroicons/solid';

const QuickAccess = () => {
  const handlePress = (itemName) => {
    Alert.alert(`Điều hướng đến ${itemName}`, `Chưa có trang cho ${itemName}. Vui lòng thêm logic điều hướng!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handlePress('Thanh toán')}>
          <LinearGradient
            colors={["#4dbccf", "#5cbaa2"]}
            style={styles.item}
          >
            <CreditCardIcon size={32} color="#7C3AED" style={styles.itemImage} />
            <Text style={styles.itemText}>Thanh toán</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('Ưu đãi')}>
          <LinearGradient
            colors={["#4dbccf", "#5cbaa2"]}
            style={styles.item}
          >
            <GiftIcon size={32} color="#7C3AED" style={styles.itemImage} />
            <Text style={styles.itemText}>Ưu đãi</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handlePress('Địa điểm đã lưu')}>
          <LinearGradient
            colors={["#4dbccf", "#5cbaa2"]}
            style={styles.item}
          >
            <MapPinIcon size={32} color="#7C3AED" style={styles.itemImage} />
            <Text style={styles.itemText}>Địa điểm đã lưu</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('Lịch sử')}>
          <LinearGradient
            colors={["#4dbccf", "#5cbaa2"]}
            style={styles.item}
          >
            <ClockIcon size={32} color="#7C3AED" style={styles.itemImage} />
            <Text style={styles.itemText}>Lịch sử</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginTop: -10,
    zIndex: 10
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 8,
    width: '170'
  },
  itemImage: {
    width: 36,
    height: 36,
    borderRadius: 4
  },
  itemText: {
    marginLeft: 10,
    color: '#444',
    fontSize: 14
  },
});

export default QuickAccess;