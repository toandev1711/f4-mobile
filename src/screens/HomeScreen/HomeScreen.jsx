import { View, Text, SafeAreaView } from "react-native";
import React from "react";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white p-4" style={{ paddingTop: 20 }}>
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold">Home Screen</Text>
      </View>
    </SafeAreaView>
   
  );
}
