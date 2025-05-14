import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  IdentificationIcon,
  UserIcon,
  CalendarIcon,
  TruckIcon,
  CheckCircleIcon,
} from "react-native-heroicons/outline";
import CarImg from "./CarImg";
const CarCard = ({
  documenttype,
  vehicleName,
  vehicleId,
  registrationDate,
  ownerName,
  status,
  vehicleType,
  // vehicleImage,
  onPress,
}) => {
  return (
     <TouchableOpacity
      onPress={onPress}
      className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm active:opacity-80"
    >
    <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">

      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <TruckIcon className="w-6 h-6 mr-2" color="#3B82F6" />
          <Text className="text-lg font-bold text-gray-800">{vehicleName}</Text>
        </View>
        <View className="flex-row items-center">
          <IdentificationIcon className="w-5 h-5 mr-1" color="#6B7280" />
          <Text className="text-sm text-gray-600 font-semibold">{vehicleId}</Text>
        </View>
      </View>
          <CarImg/>


      <View className="flex-row justify-between mb-2">
        <View className="flex-row items-center">
          <UserIcon className="w-5 h-5 mr-2" color="#6B7280" />
          <Text className="text-sm text-gray-600">
            <Text className="font-semibold">Chủ xe: </Text>{ownerName}
          </Text>
        </View>
        <View className="flex-row items-center">
          <CalendarIcon className="w-5 h-5 mr-2" color="#6B7280" />
          <Text className="text-sm text-gray-600">
            <Text className="font-semibold">Ngày đăng ký: </Text>{registrationDate}
          </Text>
        </View>
      </View>


      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-gray-600">
          <Text className="font-semibold">Loại xe: </Text>{vehicleType}
        </Text>
        <View className="flex-row items-center">
          <CheckCircleIcon className="w-5 h-5 mr-1" color="#10B981" />
          <Text className="text-sm font-semibold text-green-600">{status}</Text>
        </View>
      </View>
    </View>
        </TouchableOpacity>
  );
};

export default CarCard;
