import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function SearchAddressInput({
  icon: IconComponent,
  dotColor,
  text,
  placeholder,
  background,
  iconColor
}) {
  return (
    <View className="flex-row items-center rounded-xl mb-1">
      {/* Red dot */}
      <TouchableOpacity
        className={`flex-row flex-1 items-center rounded-lg px-3 py-2 ${background}`}
      >
        {/* Dot đỏ */}
        <View
          className={`w-3.5 h-3.5 ${
            dotColor ? dotColor : "bg-blue-800"
          }  rounded-full mr-2`}
        />

        {/* TextInput */}
       <TextInput
  multiline={true}
  className="h-9 align-top px-3 text-base text-gray-800"
  placeholder="Nhập văn bản..."
/>

      </TouchableOpacity>

      <View className="flex-col items-center justify-center w-20">
        <IconComponent size={18} color={iconColor } />
        <Text
          className="text-xs text-gray-600 text-center mt-1 leading-tight"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {text}
        </Text>
      </View>
    </View>
  );
}
