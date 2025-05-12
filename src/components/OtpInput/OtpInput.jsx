import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

const OtpInput = ({ otp, onChange, onSubmit }) => {
  return (
    <View className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
      <Text className="text-xl font-semibold mb-4">Nhập mã OTP</Text>
      
      <TextInput
        value={otp}
        onChangeText={onChange}
        placeholder="Nhập mã OTP"
        className="w-full border p-2 rounded mb-4"
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={onSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
      >
        <Text className="text-white text-center">Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpInput;
