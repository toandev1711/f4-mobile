import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CreditCardIcon, GiftIcon, MapPinIcon, ClockIcon } from 'react-native-heroicons/solid';

const QuickAccess = () => {
  const handlePress = (itemName) => {
    Alert.alert(`Điều hướng đến ${itemName}`, `Chưa có trang cho ${itemName}. Vui lòng thêm logic điều hướng!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item} onPress={() => handlePress('Thanh toán')}>
          <CreditCardIcon size={32} color="#7C3AED" style={styles.itemImage} />
          <Text style={styles.itemText}>Thanh toán</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => handlePress('Ưu đãi')}>
          <GiftIcon size={32} color="#7C3AED" style={styles.itemImage} />
          <Text style={styles.itemText}>Ưu đãi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item} onPress={() => handlePress('Địa điểm đã lưu')}>
          <MapPinIcon size={32} color="#7C3AED" style={styles.itemImage} />
          <Text style={styles.itemText}>Địa điểm đã lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => handlePress('Lịch sử')}>
          <ClockIcon size={32} color="#7C3AED" style={styles.itemImage} />
          <Text style={styles.itemText}>Lịch sử</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#F5F5F5', marginTop: -10, zIndex: 10 },
  row: { flexDirection: 'row', gap: 10, marginTop: 10 },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: { width: 36, height: 36, borderRadius: 4 },
  itemText: { marginLeft: 10, color: '#444', fontSize: 12 },
});

export default QuickAccess;