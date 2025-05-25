import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImagePickers = ({ image, onImageChange, label }) => {
  const pickImage = () => {
    Alert.alert("Chọn ảnh", "Bạn muốn chọn ảnh từ đâu?", [
      {
        text: "Thư viện",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
          });
          if (!result.canceled) {
            onImageChange({ uri: result.assets[0].uri, file: result.assets[0] });
          }
        },
      },
      {
        text: "Chụp ảnh",
        onPress: async () => {
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (permission.status !== "granted") {
            Alert.alert("Thông báo", "Bạn cần cấp quyền truy cập camera.");
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
          });
          if (!result.canceled) {
            onImageChange({ uri: result.assets[0].uri, file: result.assets[0] });
          }
        },
      },
      { text: "Huỷ", style: "cancel" },
    ]);
  };

  return (
    <View className="mb-4">
      {label && <Text className="text-lg font-semibold mb-2">{label}</Text>}
      <Image
        source={{ uri: image?.uri }}
        style={{ width: "100%", height: 200, borderRadius: 8 }}
      />
      <TouchableOpacity
        onPress={pickImage}
        className="mt-2 bg-blue-600 rounded-md py-2"
      >
        <Text className="text-center text-white font-semibold">Chọn ảnh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickers;
