import React from "react";
import { Image } from "react-native";

const CircleAvatar = ({ url }) => {
  return (
    <Image
      source={{
        uri:
          url ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
      }}
      className="w-[65px] h-[65px] rounded-full"
      resizeMode="cover"
    />
  );
};

export default CircleAvatar;
