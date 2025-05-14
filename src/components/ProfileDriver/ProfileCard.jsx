import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CircleAvatar from "../CircleAvatar/CircleAvtar";

const ProfileCard = ({ name, phone, rating, totalReviews, avatar,onPress }) => {
  return (
    <View className="bg-white rounded-xl mt-[-40px] mx-4 p-4 shadow-lg z-10">
      <View className="items-center mb-4 -mt-14">
      <CircleAvatar/>
      </View>

      <View className="flex-row justify-center items-center">
        <Text className="text-xl font-bold text-gray-900">{name}</Text>
        <Ionicons name="shield-checkmark" size={20} color="#2563EB" className="ml-2" />
      </View>

      <Text className="text-center text-gray-500 mt-1">{phone}</Text>

      <View className="flex-row justify-center items-center mt-3">
        <View className="flex-row items-center bg-yellow-100 px-3 py-1 rounded-full mr-2">
          <Ionicons name="star" size={16} color="#FACC15" />
          <Text className="ml-1 font-bold text-yellow-600">{rating}</Text>
          <Text className="ml-1 text-gray-500 text-sm">({totalReviews})</Text>
        </View>
        <TouchableOpacity
          onPress={onPress}
          className="flex-row items-center border border-gray-300 px-3 py-1 rounded-full"
        >
          <Ionicons name="create-outline" size={16} color="#007AFF" />
          <Text className="ml-1 text-blue-500 font-medium">Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap justify-center mt-4 gap-2">
        <View className="bg-gray-100 px-3 py-1 rounded-full flex-row items-center">
          <Ionicons name="ribbon-outline" size={14} color="#6B7280" />
          <Text className="ml-1 text-sm text-gray-700">Tài xế xuất sắc</Text>
        </View>
        <View className="bg-gray-100 px-3 py-1 rounded-full flex-row items-center">
          <Ionicons name="happy-outline" size={14} color="#6B7280" />
          <Text className="ml-1 text-sm text-gray-700">Phục vụ tốt</Text>
        </View>
        <View className="bg-gray-100 px-3 py-1 rounded-full flex-row items-center">
          <Ionicons name="briefcase-outline" size={14} color="#6B7280" />
          <Text className="ml-1 text-sm text-gray-700">Chuyên nghiệp</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
