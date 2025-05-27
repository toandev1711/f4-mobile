import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  DocumentIcon,
  CheckCircleIcon,
  CalendarIcon,
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


const DocumentCard = ({
  title,
  id,
  issueDate,
  expiryDate,
  status,
  onPress,
  statusName
}) => {
  const statusColor = getStatusColor(statusName);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm active:opacity-80"
    >
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

      {/* Body */}
      <View className="flex-col">
        <Text className="text-sm text-gray-600 mb-1">
          <Text className="font-semibold">Mã số: </Text>
          {id}
        </Text>

        <View className="flex-row items-center mb-1">
          <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
          <Text className="text-sm text-gray-600">
            <Text className="font-semibold">Ngày cấp: </Text>
            {issueDate}
          </Text>
        </View>

        <View className="flex-row items-center">
          <CalendarIcon className="w-4 h-4 mr-2" color="#6B7280" />
          <Text className="text-sm text-gray-600">
            <Text className="font-semibold">Ngày hết hạn: </Text>
            {expiryDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentCard;
