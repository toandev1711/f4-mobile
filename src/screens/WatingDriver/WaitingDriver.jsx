// screens/SearchingScreen.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { cancelBooking } from "../../api/Booking/cancelBooking";
import { useNavigation } from "@react-navigation/native";

export default function WaitingDriver() {
  const navigation = useNavigation();
  const { bookingId } = useAuth();
  const handleCancel = async () => {
    await cancelBooking(bookingId);
    navigation.navigate("MainTabs", {
      screen: "Home",
    });
  };
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <ActivityIndicator size="large" color="#22c55e" />
      <Text className="mt-4 text-lg font-semibold text-gray-700">
        Đang tìm tài xế phù hợp...
      </Text>
      <TouchableOpacity
        onPress={handleCancel}
        className="mt-6 px-6 py-3 bg-red-500 rounded-full"
      >
        <Text className="text-white font-semibold text-base">Hủy</Text>
      </TouchableOpacity>
    </View>
  );
}
