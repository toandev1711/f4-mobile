import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import RegisterHeader from "./RegisterHeader";
const PhoneNumberInputScreen = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const handleNext = () => {
    if (!/^0\d{9}$/.test(phone)) {
      setError(true);
    } else {
      setError(false);
      navigation.navigate("otp", { phone });
    }
  };

  return (
    <View className="flex-1 bg-white px-6 py-2">
      <RegisterHeader content="Bắt đầu với chúng tôi "/>
      <Text className="text-lg font-semibold text-gray-500 mb-2">
        Nhập số điện thoại
      </Text>
      <View className="flex-row items-center border-b border-red-500 mb-1 pb-3">
        <Image
          source={{ uri: "https://flagcdn.com/w40/vn.png" }}
          className="w-6 h-4 mr-2"
        />
        <Text className="text-base text-black mr-2">+84</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="99 123 4567"
          value={phone}
          onChangeText={setPhone}
          className="flex-1 text-base text-gray-700 bottom-1"
        />
      </View>

      {error && (
        <Text className="text-red-500 mb-2">
          vui lòng nhập số điện thoại hợp lệ
        </Text>
      )}

      <TouchableOpacity
        onPress={handleNext}
        className="mt-6 bg-green-500 py-3 rounded-full"
      >
        <Text className="text-center text-base text-white font-semibold p-1">
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneNumberInputScreen;
