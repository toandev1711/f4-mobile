// components/Transport/SearchTouchableField.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MapIcon, ChevronLeftIcon } from "react-native-heroicons/solid";
import SearchAddressInput from "../SearchAddressInput/SearchAddressInput";

export default function SearchAddTouch({
  id,
  placeholder,
  focusedInputId,
  editableInputId,
  onFocus,
  onBlur,
  onChangeText,
  currentValue,
  dotColor = "bg-blue-400",
  size,
  goBack,
  tailSize
}) {
  const isFocused = focusedInputId === id;
  const isEditable = editableInputId === id;

  return (
    <TouchableOpacity onPress={() => onFocus(id)}>
      <View className="flex-row items-center rounded-xl px-2 py-2">
        <View className="w-5">
          <ChevronLeftIcon
            size={size}
            onPress={goBack}
          />
        </View>
        <View className="flex-row justify-center items-center">
          <View
            className={`w-10/12 rounded-lg bg-gray-100 ${
              isFocused ? "bg-gray-100" : "bg-white"
            }`}
          >
            {isFocused ? (
              <SearchAddressInput
                id={id}
                placeholder={placeholder}
                onChangeText={onChangeText}
                focused={isFocused}
                editable={isEditable}
                onFocus={onFocus}
                onBlur={onBlur}
                dotColor={dotColor}
              />
            ) : (
              <View className="flex-row h-12 flex items-center px-2">
                <View className={`w-3.5 h-3.5 rounded-full mr-2 ${dotColor}`} />
                <View className="text-base text-gray-800 px-2">
                  <Text numberOfLines={1}>{currentValue}</Text>
                </View>
              </View>
            )}
          </View>
          <View className="ml-3">
            <MapIcon size={tailSize || 22}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
