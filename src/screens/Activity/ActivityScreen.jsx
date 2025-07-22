import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ClockIcon } from "react-native-heroicons/outline";
import BookingHistory from "../BookingScreen/BookingStory";
import { useAuth } from "../../context/AuthContext";
export default function ActivityScreen() {
  const navigation = useNavigation();
  const { bookingHistory } = useAuth();
  return (
    <View className="flex-1 bg-white ">
      <View className="flex-row justify-between items-center px-4 py-5 bg-green-500">
        <Text
          className="text-3xl font-semibold mt-7 text-white"
          style={{ fontFamily: "facebook-sans-bold" }}
        >
          Lịch sử hoạt động
        </Text>
        <TouchableOpacity
          className="bg-green-50 rounded-full px-3 py-2 flex-row items-center mt-7"
          onPress={() => navigation.navigate("ActivityHistory")}
        >
          <ClockIcon color="#104d45" size={20} strokeWidth={2.0} />
          <Text className="text-green-900 ml-1 text-lg font-semibold">
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 ">
        {/* <Image
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
        </View> */}
        <BookingHistory />
      </View>
    </View>
  );
}
