import React from "react";
import { Image, View } from "react-native";

const CarImg = ({ url }) => {
  return (
    <View className="my-3 items-center">
      <Image
        source={{
          uri:
            url ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
        }}
        className="w-full h-[160px] rounded-lg"
        resizeMode="cover"
      />
    </View>
  );
};

export default CarImg;
