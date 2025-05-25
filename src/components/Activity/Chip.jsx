import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import clsx from "clsx";

export default function Chip({ label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={clsx(
          "px-4 py-2 rounded-full mr-3",
          active ? "bg-green-900" : "bg-green-50"
        )}
      >
        <Text
          className={clsx(
            "font-semibold text-sm",
            active ? "text-white" : "text-green-900"
          )}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
