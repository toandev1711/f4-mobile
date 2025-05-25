import React from "react";
import { View, Text } from "react-native";

export default function RouteCard({ from, to, timeFrom, timeTo }) {
  return (
    <View className="bg-white rounded-xl border border-gray-200 p-4">
      <View className="flex-row justify-between mb-3">
        <Text className="text-sm text-gray-700 font-medium">GrabBike Huế</Text>
        <Text className="text-sm text-gray-500">0.53 km • 5min</Text>
      </View>

      <View className="flex-row">
        <View className="items-center mr-3">
          <View className="w-3 h-3 rounded-full bg-blue-500 mt-1" />
          <View className="w-0.5 h-11 bg-gray-100 my-0.5" />
          <View className="w-3 h-3 rounded-full bg-red-500" />
        </View>

        <View className="flex-1">
          <View className="mb-4">
            <Text className="text-base font-medium text-gray-900">
              {from || "Intersection of Chu Van An - Le Loi"}
            </Text>
            <Text className="text-sm text-gray-500">
              {timeFrom || "10:30 PM"}
            </Text>
          </View>

          <View>
            <Text className="text-base font-medium text-gray-900">
              {to || "40 Nguyễn Sinh Cung"}
            </Text>
            <Text className="text-sm text-gray-500">
              {timeTo || "10:36 PM"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
