import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const RegisterHeader = ({ content }) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View className="flex-row items-center mb-10">
      <TouchableOpacity onPress={handleGoBack}>
        <ArrowLeftIcon />
      </TouchableOpacity>
      <Text className="text-xl font-medium ml-2">{content}</Text>
    </View>
  );
};

export default RegisterHeader;
