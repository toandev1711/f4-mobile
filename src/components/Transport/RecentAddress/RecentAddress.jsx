import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ClockIcon, MapPinIcon } from "react-native-heroicons/solid";

const RecentAddress = ({ item, onPress, display }) => {
  
  return (
    <TouchableOpacity
      className="flex-row py-4 items-center border-b border-gray-200"
        onPress={onPress}
    >
      <View className="items-center w-20 px-2">
        <MapPinIcon size={20} color="#60A5FA" />
        <Text className="text-xs text-gray-500 mt-1">
          {item.distance || ' '} km
        </Text>
      </View>
      <View className="flex-1">
        <Text className="font-semibold text-black">
          {item.name || item.display}
        </Text>
        <Text className="text-sm text-gray-500">
          {item.address || item.fullAddress}
        </Text>
      </View>
      <TouchableOpacity className="px-2 items-center">
        <Text className="text-2xl text-gray-400">⋮</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default RecentAddress;
