import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
} from "react-native-heroicons/outline";
import RouteCard from "../../components/Activity/RouteCard";

export default function HistoryDetailScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const data = params?.item;

  return (
    <ScrollView className="flex-1 bg-white px-4 py-4">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mb-4 flex-row items-center"
      >
        <ChevronLeftIcon size={22} color="black" />

        <Text className="text-xl font-semibold">
          {data?.time || "23 Jan 2025, 10:30PM"}
        </Text>
      </TouchableOpacity>

      <View className="mb-4  flex-row justify-between items-center">
        <Text className="text-lg text-gray-500">Booking ID</Text>
        <View className="flex-row items-center">
          <Text className="text-sm font-semibold items-center">
            {data?.bookingId || "abcfasssf"}{" "}
          </Text>
          <DocumentDuplicateIcon size={19} color="#ccc" />
        </View>
      </View>

      <View className="border border-gray-100 rounded-xl p-4 mb-4 flex-row items-center">
        <ExclamationTriangleIcon />
        <Text className="text-sm text-gray-500 ml-3">
          Bạn sẽ không thể đánh giá hoặc khiếu nại về chuyến đi này sau 7 ngày
        </Text>
      </View>

      <View className="border border-gray-200 rounded-xl px-4 mb-4">
        <View className="flex-row items-center my-2 py-2">
          <CurrencyDollarIcon size={24} color="#104d45" />
          <Text className="text-base font-facebook-narrow ml-3">Tiền mặt</Text>
        </View>
        <View className="flex-row items-center my-2 py-2">
          <UserCircleIcon size={24} color="#104d45" />
          <Text className="text-base ml-3">
            {data?.accountName || "Nguyen Van A"}
          </Text>
        </View>
        <View className="flex-row items-center py-3 border-t border-gray-200 justify-between">
          <Text className="text-base font-semibold">Total</Text>
          <Text className="text-base font-bold">20.000đ</Text>
        </View>
      </View>

      <RouteCard
        from={data?.from || "Intersection of Chu Van An - Le Loi"}
        to={data?.to || "40 Nguyễn Sinh Cung"}
        timeFrom={data?.timeFrom || "10:30 PM"}
        timeTo={data?.timeTo || "10:36 PM"}
      />

      <TouchableOpacity className="my-3">
        <Text className="text-center text-blue-600 font-semibold">
          Report An Issue
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-green-600 rounded-full py-5 my-3"
        onPress={() => {}}
      >
        <Text className="text-white text-center font-semibold text-base">
          Rebook
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
