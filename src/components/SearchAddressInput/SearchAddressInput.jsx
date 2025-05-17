import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function SearchAddressInput({
  id,
  icon: IconComponent,
  text,
  placeholder,
  dotColor = "bg-blue-800",
  background = "bg-white",
  iconColor,
  focused,
  onFocus,
  onBlur,
  editable,
  onChangeText,
  ref,
}) {
  return (
    <TouchableWithoutFeedback>
      <View className={`flex-row h-12 flex items-center px-2`}>
        <View className="flex-row flex-1 items-center">
          <View
            className={`w-3.5 h-3.5 rounded-full mr-2 ${dotColor}`}
            style={{ marginTop: 1 }}
          />

          <TextInput
            ref={ref}
            placeholder={placeholder}
            className="text-base text-gray-800 flex-1 px-2 mb-1"
            style={{
              height: 50, 
              paddingVertical: 0,
              textAlignVertical: "center", 
              includeFontPadding: false,
            }}
            editable={editable ?? true}
            returnKeyType="done"
            onChangeText={onChangeText}
          />
        </View>

        {IconComponent && (
          <TouchableOpacity>
            <View className="items-center justify-center w-20">
              <IconComponent size={18} color={iconColor} />
              <Text className="text-xs text-gray-600 text-center mt-1">
                {text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
