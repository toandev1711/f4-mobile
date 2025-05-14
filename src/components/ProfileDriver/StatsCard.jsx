import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const StatsCard = ({ label, value, percentage, iconName }) => {
  return (
    <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm mx-4">
      <View className="flex-row justify-between items-center mb-1">
        <View className="flex-row items-center">
          <Ionicons name={iconName} size={18} color="#93C5FD" />
          <Text className="ml-2 text-base text-gray-600">{label}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="arrow-up" size={16} color="#10B981" />
          <Text className="ml-1 text-sm text-green-600 font-semibold">{percentage}</Text>
        </View>
      </View>
      <Text className="text-2xl font-bold text-gray-800">{value}</Text>
    </View>
  );
};

export default StatsCard;
