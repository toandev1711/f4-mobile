import React from "react";
import { View, Text } from "react-native";
import {
  DocumentIcon,
  CheckCircleIcon,
  CalendarIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#F59E0B"; 
    case "approved":
      return "#10B981"; 
    case "cancelled":
      return "#EF4444"; 
    default:
      return "#6B7280";
  }
};

const DocumentInfo = ({
  type, // "vehicle" | "license" | "personal"
  title,
  id,

  // vehicle
  licensePlateNumber,
  ownerName,
  brand,
  engineNumber,
  vehicleTypeName,
  issueDate,
  createAt,
  statusName,

  // license
  licenseClass,
  place,
  expiryDate,
  link,
  // personal
  issuedPlace,
}) => {
  const statusColor = getStatusColor(statusName);
  return (
    <View className="bg-white border border-gray-200 rounded-lg p-4 mx-2 my-1 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <DocumentIcon className="w-5 h-5 mr-2" color="#3B82F6" />
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
        </View>

        <View className="flex-row items-center">
          <CheckCircleIcon className="w-5 h-5 mr-1" color={statusColor} />
          <Text className="text-sm font-semibold" style={{ color: statusColor }}>
            {statusName}
          </Text>
        </View>
      </View>

      <View className="flex-col">
        {type === "vehicle" && (
          <>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Biển số xe: </Text>
              {licensePlateNumber}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Chủ xe: </Text>
              {ownerName}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Thương hiệu: </Text>
              {brand}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Số máy: </Text>
              {engineNumber}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Loại xe: </Text>
              {vehicleTypeName}
            </Text>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Ngày cấp: </Text>
                {issueDate}
              </Text>
            </View>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Ngày tạo: </Text>
                {createAt}
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
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Hạng GPLX: </Text>
              {licenseClass}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              <Text className="font-semibold">Nơi cấp: </Text>
              {place}
            </Text>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Ngày cấp: </Text>
                {issueDate}
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
              <Text className="font-semibold">Số định danh: </Text>
              {id}
            </Text>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
              <Text className="text-sm text-gray-600">
                <Text className="font-semibold">Ngày cấp: </Text>
                {issueDate}
              </Text>
            </View>
            <View className="flex-row items-center mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
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
