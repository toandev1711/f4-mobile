import React from "react";
import { View, Text } from "react-native";
import { ClockIcon } from "react-native-heroicons/solid";

const RideOption = ({text, icon}) => {
  return (
    <View className="bg-blue-100 rounded-xl p-4 w-[48%]">
      <Text className="font-semibold mb-2">{text}</Text>
      {icon}
    </View>
  );
};

export default RideOption;
