import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import RegisterHeader from "./RegisterHeader";
const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { phone } = route.params;

  const handleVerify = () => {
    if (otp === "123456") {
      navigation.navigate("fullInfomation", { phone });
    } else {
      setError(true);
    }
  };

  return (
    <View className="flex-1 bg-white px-6">
      <RegisterHeader content="Nhập mã OTP" />
      <Text className="mb-2 text-gray-700">OTP đã được gửi tới {phone}</Text>

      <TextInput
        placeholder="Nhập mã OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        className="border border-gray-300 rounded-lg px-4 py-3.5 mb-2"
      />
      {error && <Text className="text-red-500 mb-2">Mã OTP không đúng.</Text>}

      <TouchableOpacity
        onPress={handleVerify}
        className="mt-6 bg-green-500 py-3 rounded-full"
      >
        <Text className="text-center text-base text-white font-semibold p-1">
          Xác nhận
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerificationScreen;
