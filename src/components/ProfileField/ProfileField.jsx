import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ProfileField = ({ label, value, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick} style={{ flexDirection: "row", paddingVertical: 12 }}>
      <View style={{ width: "35%" }}>
        <Text style={{ color: "#6B7280", fontSize: 16 }}>{label}</Text>
      </View>
      <View style={{ width: "60%", borderBottomWidth: 1, borderBottomColor: "#D1D5DB", paddingVertical: 4 }}>
        <Text style={{ color: "#374151", fontSize: 16 }}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileField;
