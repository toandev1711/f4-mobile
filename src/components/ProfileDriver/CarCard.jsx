import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  IdentificationIcon,
  UserIcon,
  CalendarIcon,
  TruckIcon,
  CheckCircleIcon,
} from "react-native-heroicons/outline";
import CarImg from "./CarImg";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#F59E0B"; // orange
    case "approved":
      return "#10B981"; // green
    case "cancelled":
      return "#EF4444"; // red
    default:
      return "#6B7280"; // gray for unknown status
  }
};

const CarCard = ({
  documenttype,
  brand,
  licensePlateNumber,
  issueDate,
  ownerName,
  statusName,
  vehicleTypeName,
  frontPhoto,
  backPhoto,
  onPress,
}) => {
  const statusColor = getStatusColor(statusName);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm active:opacity-80"
    >
      <View>
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            <TruckIcon className="w-6 h-6 mr-2" color="#3B82F6" />
            <Text className="text-lg font-bold text-gray-800">{brand}</Text>
          </View>
          <View className="flex-row items-center">
            <IdentificationIcon className="w-5 h-5 mr-1" color="#6B7280" />
            <Text className="text-sm text-gray-600 font-semibold">{licensePlateNumber}</Text>
          </View>
        </View>

        {/* HIỂN THỊ 2 ẢNH FRONT VÀ BACK CẠNH NHAU */}
        <View className="flex-row justify-center space-x-4 my-3">
          
          <CarImg url={frontPhoto}/>
        </View>
 
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
              <Text className="font-semibold">Ngày đăng ký: </Text>{issueDate}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-600">
            <Text className="font-semibold">Loại xe: </Text>{vehicleTypeName}
          </Text>
          <View className="flex-row items-center">
            <CheckCircleIcon className="w-5 h-5 mr-1" color={statusColor} />
            <Text className="text-sm font-semibold" style={{ color: statusColor }}>
              {statusName}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarCard;
