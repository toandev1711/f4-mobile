import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  DocumentIcon,
  CheckCircleIcon,
  CalendarIcon,
} from "react-native-heroicons/outline";

const DocumentCard = ({
  title,
  id,
  issueDate,
  expiryDate,
  status,
  onPress,
}) => {
  return (
         <TouchableOpacity
          onPress={onPress}
          className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm active:opacity-80"
        >
    <View className="bg-white border border-gray-200 rounded-lg p-4 mx-2 my-1 shadow-sm">
      {/* Header */}
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
    </View>
    </TouchableOpacity>
  );
};

export default DocumentCard;
