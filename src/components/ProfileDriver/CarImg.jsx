import React from "react";
import { View, Image, StyleSheet } from "react-native";

const CarImg = ({ url }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: url || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" }}
        style={[styles.image, styles.leftImage]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 150,
    paddingHorizontal: 20,
  },
  image: {
    height: 170,
   width: 280,
  },
});
export default CarImg;
