import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import Chip from "../../components/Activity/Chip";
import HistoryItem from "../../components/Activity/HistoryItem";
import { AuthProvider, useAuth } from "../../context/AuthContext";

export default function ActivityHistoryScreen() {
  const navigation = useNavigation();

  // Fake data demo
  const historyData = [
    {
      from: "Intersection of Chu Van An - Le Loi",
      to: "40 Nguyễn Sinh Cung",
      price: "26.000₫",
      time: "23 Jan 2025, 22:31",
    },
    {
      from: "40/5 Nguyễn Sinh Cung St.",
      to: "20 Võ Thị Sáu",
      price: "16.000₫",
      time: "23 Jan 2025, 19:59",
    },
    {
      from: "352 Phan Chu Trinh St.",
      to: "99 Cao Xuân Đức St.",
      price: "20.000₫",
      time: "7 Jan 2025, 21:58",
    },
    {
      from: "99 Cao Xuân Đức St.",
      to: "338 Phan Chu Trinh St.",
      price: "17.000₫",
      time: "7 Jan 2025, 19:39",
    },
  ];
  const [activeTab, setActiveTab] = useState("Transport");
  const { bookingHistory } = useAuth();
  console.log("Booking History:", bookingHistory);

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <View className="flex-row items-center mb-7">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={20} strokeWidth={2.5} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold ml-3">Lịch sử hoạt động</Text>
      </View>
      <View className="flex-row space-x-2 mb-7">
        {["Transport", "Food", "Mart", "Finance"].map((tab) => (
          <Chip
            key={tab}
            label={tab}
            active={activeTab === tab}
            onPress={() => setActiveTab(tab)}
          />
        ))}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {bookingHistory.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ActivityHistoryDetail", { item })
            }
          >
            <HistoryItem key={index} item={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
