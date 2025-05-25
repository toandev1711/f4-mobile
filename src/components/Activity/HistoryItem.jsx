import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const HistoryItem = ({ item }) => {
  return (
    <View key={item.index} className="flex-row items-start mb-6">
      <Image
        source={require("../../../assets/img/bike-icon.png")}
        className="w-10 h-10 mr-3 mt-1"
        resizeMode="contain"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">
          {item.from} to {item.to}
        </Text>
        <Text className="text-sm text-gray-600 mt-1">{item.time}</Text>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-base font-semibold text-green-700">
            {item.price}
          </Text>
          <TouchableOpacity>
            <Text className="text-gray-600 font-medium text-sm">Rebook →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HistoryItem;
