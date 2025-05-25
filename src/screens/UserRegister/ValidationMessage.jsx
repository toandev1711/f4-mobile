import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ValidationMessage = ({ condition, message, isEmpty }) => {
  // Màu xám khi chưa nhập, đỏ khi sai, xanh khi đúng
  let color = isEmpty ? "gray" : condition ? "green" : "red";
  let iconName = condition ? "check-circle" : "times-circle";

  return (
    <View className="flex-row items-center mb-1">
      <Icon
        name={iconName}
        size={16}
        color={color}
        style={{ marginRight: 8 }}
      />
      <Text style={{ color, fontSize: 14 }}>
        {message}
      </Text>
    </View>
  );
};

export default ValidationMessage;
