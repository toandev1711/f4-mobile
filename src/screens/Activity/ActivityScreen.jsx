import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ClockIcon } from "react-native-heroicons/outline";
export default function ActivityScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white px-4 py-4">
      <View className="flex-row justify-between items-center mb-10">
        <Text className="text-3xl font-semibold">Activity</Text>
        <TouchableOpacity
          className="bg-green-50 rounded-full px-3 py-2 flex-row items-center"
          onPress={() => navigation.navigate("ActivityHistory")}
        >
          <ClockIcon color="#104d45" size={20} strokeWidth={2.0} />
          <Text className="text-green-900 ml-1 text-lg font-semibold">
            History
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("../../../assets/img/empty-paper.png")}
          className="w-42 h-40"
          resizeMode="contain"
        />
        <View className="items-center">
          <Text className="text-2xl font-semibold text-gray-700">
            Không có hoạt động nào gần đây
          </Text>
          <Text className="text-lg text-gray-500 text-center mt-2">
            Khi bạn bắt đầu sử dụng ứng dụng, lịch sử hoạt động sẽ hiển thị ở
            đây.
          </Text>
        </View>
      </View>
    </View>
  );
}
