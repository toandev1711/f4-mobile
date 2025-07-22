import React from "react";
import { View, Text, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function ChatDetailScreen() {
  const route = useRoute();
  const { partnerName, messages, partnerId } = route.params;

  const renderItem = ({ item }) => {
    const isFromPartner = item.senderId === partnerId;
    return (
      <View
        className={`p-3 rounded-xl my-1 max-w-[75%] ${
          isFromPartner ? "bg-gray-200 self-start" : "bg-blue-500 self-end"
        }`}
      >
        <Text className={isFromPartner ? "text-black" : "text-white"}>
          {item.content}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            isFromPartner ? "text-right text-gray-500" : "text-right text-white"
          }`}
        >
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">{partnerName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
