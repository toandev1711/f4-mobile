import React from "react";
import { View, Text } from "react-native";
import {
  DocumentIcon,
  CheckCircleIcon,
  CalendarIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";

const DocumentInfo = ({
  type = "vehicle", // "vehicle" | "license" | "personal"
  status,
  title,
  id,
  licensePlate,
  vehicleType,
  vehicleColor,
  registrationDate,
  name,
  number,
  birthDate,
  gender,
  residence,
  issuedDate,
  expiryDate,
  issuedPlace,
}) => {
  return (
    <View className="bg-white border border-gray-200 rounded-lg p-4 mx-2 my-1 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <DocumentIcon className="w-5 h-5 mr-2" color="#3B82F6" />
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
        </View>

        <View className="flex-row items-center">
          <CheckCircleIcon className="w-5 h-5 mr-1" color="#10B981" />
          <Text className="text-sm text-green-600 font-semibold">{status}</Text>
        </View>
      </View>

      <View className="flex-col">
        {type === "vehicle" && (
          <>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Biển số xe: </Text>
              {licensePlate}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Loại xe: </Text>
              {vehicleType}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Màu xe: </Text>
              {vehicleColor}
            </Text>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Ngày đăng ký: </Text>
                {registrationDate}
              </Text>
            </View>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Ngày hết hạn: </Text>
                {expiryDate}
              </Text>
            </View>
            <View className="flex-row items-center mb-1">
              <MapPinIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Nơi cấp: </Text>
                {issuedPlace}
              </Text>
            </View>
          </>
        )}

        {type === "license" && (
          <>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Mã số GPLX: </Text>
              {id}
            </Text>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Ngày cấp: </Text>
                {issuedDate}
              </Text>
            </View>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Ngày hết hạn: </Text>
                {expiryDate}
              </Text>
            </View>
          </>
        )}

        {type === "personal" && (
          <>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Họ và tên: </Text>
              {name}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Số CMND/CCCD: </Text>
              {number}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Ngày sinh: </Text>
              {birthDate}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Giới tính: </Text>
              {gender}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Nơi cư trú: </Text>
              {residence}
            </Text>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Ngày cấp: </Text>
                {issuedDate}
              </Text>
            </View>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Ngày hết hạn: </Text>
                {expiryDate}
              </Text>
            </View>
            <View className="flex-row items-center mb-1">
              <MapPinIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Nơi cấp: </Text>
                {issuedPlace}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default DocumentInfo;
