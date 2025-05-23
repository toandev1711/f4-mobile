import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({
  content,
  onPress,
  widthClass,     
  heightClass,   
  bgClass,   
  textColor = "text-white",
  textSize = "text-base",  
  width,
  height
}) => {
  return (
    <TouchableOpacity
      className={`rounded-md items-center justify-center px-6 py-3 ${widthClass} ${heightClass} ${bgClass} ${width} ${height}`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className={`${textColor} ${textSize} font-semibold`}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
