// BookingScreen.jsx
import React, { useState } from 'react';
import { ScrollView, View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import TransportTypeSwitcher from '../../components/TransportTypeSwitcher/TransportTypeSwitcher';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import ServiceDetails from '../../components/ServiceDetails/ServiceDetails';
import CargoInfo from '../../components/CargoInfo/CargoInfo';

const PASSENGER_VEHICLES = [
  { id: '1', name: 'Xe máy', price: 13000, description: 'Tối đa 1 khách' },
  { id: '2', name: 'Xe 4 chỗ', price: 28000, description: 'Tối đa 4 khách' },
  { id: '3', name: 'Xe 7 chỗ', price: 35000, description: 'Tối đa 7 khách' },
];

const CARGO_VEHICLES = [
  { id: '4', name: 'Xe máy', price: 15000, description: 'Giao hàng nhanh chóng, an toàn' },
  { id: '5', name: 'Xe tải', price: 50000, description: 'Phù hợp với hàng hóa lớn, cồng kềnh' },
];

const BookingScreen = () => {
  const [transportType, setTransportType] = useState('passenger');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [notes, setNotes] = useState('');
  const [cargoInfo, setCargoInfo] = useState({
    name: '',
    weight: '',
    dimensions: '',
    image: null
  });

  const handleBook = () => {
    if (!selectedVehicle) {
      Alert.alert('Thông báo', 'Vui lòng chọn phương tiện');
      return;
    }
    
    if (transportType === 'cargo' && (!cargoInfo.name || !cargoInfo.weight)) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin hàng hóa');
      return;
    }

    const bookingData = {
      transportType,
      vehicle: selectedVehicle,
      promoCode,
      paymentMethod,
      notes,
      ...(transportType === 'cargo' && { cargoInfo })
    };
    
    console.log('Dữ liệu đặt xe:', bookingData);
    Alert.alert('Thành công', 'Đặt xe thành công!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ServiceDetails
        pickup="Bến Xe Trung Tâm TP.Đà Nẵng"
        destination="Sân bay Quốc tế Đà Nẵng"
        onPickupPress={() => console.log('Chọn điểm đón')}
        onDestinationPress={() => console.log('Chọn điểm đến')}
      />

      <TransportTypeSwitcher
        currentType={transportType}
        onTypeChange={setTransportType}
      />

      {(transportType === 'passenger' ? PASSENGER_VEHICLES : CARGO_VEHICLES).map(vehicle => (
        <VehicleCard
          key={vehicle.id}
          title={vehicle.name}
          price={`${vehicle.price.toLocaleString()}đ`}
          description={vehicle.description}
          selected={selectedVehicle === vehicle.id}
          onPress={() => setSelectedVehicle(vehicle.id)}
        />
      ))}

      {transportType === 'cargo' && (
        <CargoInfo
          cargoData={cargoInfo}
          onUpdate={(field, value) => setCargoInfo(prev => ({...prev, [field]: value}))}
        />
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Mã giảm giá</Text>
        <TextInput
          style={styles.promoCodeInput} 
          placeholder="Nhập mã của bạn..."
          placeholderTextColor="#888"
          value={promoCode}
          onChangeText={setPromoCode}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Ghi chú cho tài xế</Text>
        <TextInput
          style={styles.notesInput}
          placeholder=" "
          placeholderTextColor="#888"
          multiline
          numberOfLines={3}
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <TouchableOpacity 
        style={styles.bookButton} 
        onPress={handleBook}
        activeOpacity={0.7}
      >
        <Text style={styles.bookButtonText}>ĐẶT XE NGAY</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#f8f9fa',
  },
  inputGroup: {
    marginVertical: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
   // color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    backgroundColor: 'white',
    height: 50,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    backgroundColor: 'white',
  },
  paymentSection: {
    marginTop: 1,
    paddingVertical: 1,
    fontWeight: '700',

  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 14,
    fontWeight: '700',
  },
  bookButton: {
    backgroundColor: '#0984e3',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  promoCodeInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    backgroundColor: 'white',
    height: 45, 
    textAlignVertical: 'center',
    paddingVertical: 10, 
  },
});

export default BookingScreen;
