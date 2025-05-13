import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({
  content,
  onPress,
  widthClass,     
  heightClass,   
  bgClass,   
  textColor = "text-white",
  textSize = "text-sm",  
  width,
  height
}) => {
  return (
    <TouchableOpacity
      className={`rounded-md items-center justify-center px-5 py-2 ${widthClass} ${heightClass} ${bgClass} ${width} ${height}`}
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
