import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { EllipsisVerticalIcon } from "react-native-heroicons/outline";
import { useAuth } from "../../context/AuthContext";
import { getBookingHistory } from "../../api/Booking/getBookingHistory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "lodash";

const bookings = [
  {
    location: "TP.HCM",
    dateRange: "14–20 Jul 2025",
    driver: "Le Van Minh Toan",
    createdDate: null,
    pickupAddress: "345 Lê thiện trị",
    dropoffAddress: "456 Nam Kỳ khởi nghĩa",
    amount: "₫450.000",
  },
  {
    location: "Hà Nội",
    dateRange: "2–3 Jul 2025",
    driver: null,
    createdDate: null,
    pickupAddress: "123 Hai Bà Trưng",
    dropoffAddress: "789 Nguyễn Du",
    amount: "₫350.000",
  },
];

import { useNavigation } from "@react-navigation/native";

const BookingCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HistoryDetailScreen", { booking: item })
      }
      className="flex-row items-center bg-white rounded-xl p-3 mb-3 shadow-sm border border-gray-200"
    >
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
        }}
        className="w-16 h-16 rounded-lg mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="font-semibold text-base text-black">
          {item.driver || "Chưa có tài xế"}
        </Text>
        <Text className="text-gray-600 text-sm">{item.price} đ</Text>
        <Text className="text-green-500 text-sm mt-1">Hoàn tất</Text>
      </View>
      <TouchableOpacity className="p-2">
        <EllipsisVerticalIcon size={20} color="gray" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function BookingHistory() {
  const [bookingHistory, setBookingHistory] = useState([]);
  useEffect(() => {
    const fetchBookingHistory = async () => {
      const bh = await getBookingHistory(
        "742feaf0-a374-410c-823c-dab7ad0e32d8"
      );

      const sorted = bh.sort((a, b) => {
        const dateA = new Date(a.createdDate);
        const dateB = new Date(b.createdDate);
        return dateB - dateA; // Ngày mới hơn lên trước
      });
      console.log(bh);

      setBookingHistory(sorted);
    };

    fetchBookingHistory();
  }, []);

  function formatDateTime(input) {
    const date = new Date(input);

    if (isNaN(date)) return "Invalid Date";

    const pad = (n) => n.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <View className="px-4">
          {bookingHistory?.map(
            (section, index) =>
              section.createdDate &&
              section.driver && (
                <View key={index} className="mt-2 mb-6">
                  <Text className="text-base font-semibold text-gray-700 mb-1">
                    Đà Nẵng
                  </Text>
                  <Text className="text-sm text-gray-500 mb-2">
                    Ngày tạo{" "}
                    {formatDateTime(section.createdDate) || "23 Jan 2025"}
                  </Text>
                  <BookingCard item={section} />
                </View>
              )
          )}
        </View>
      </ScrollView>
    </View>
  );
}
