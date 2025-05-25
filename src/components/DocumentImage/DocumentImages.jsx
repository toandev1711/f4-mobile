import React from "react";
import { View, Image, Text } from "react-native";

const DocumentImages = ({ frontPhoto, backPhoto }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
      <View style={{ flex: 1, marginRight: 8, alignItems: "center" }}>
        <Text style={{ marginBottom: 8, fontWeight: "600", color: "#4B5563" }}>Mặt trước</Text>
        {frontPhoto ? (
          <Image
            source={{ uri: frontPhoto }}
            style={{ width: "100%", height: 180, borderRadius: 8 }}
            resizeMode="contain"
          />
        ) : (
          <Text style={{ color: "#9CA3AF" }}>Không có ảnh</Text>
        )}
      </View>

      <View style={{ flex: 1, marginLeft: 8, alignItems: "center" }}>
        <Text style={{ marginBottom: 8, fontWeight: "600", color: "#4B5563" }}>Mặt sau</Text>
        {backPhoto ? (
          <Image
            source={{ uri: backPhoto }}
            style={{ width: "100%", height: 180, borderRadius: 8 }}
            resizeMode="contain"
          />
        ) : (
          <Text style={{ color: "#9CA3AF" }}>Không có ảnh</Text>
        )}
      </View>
    </View>
  );
};

export default DocumentImages;
