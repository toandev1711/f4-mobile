import React, { useCallback, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { EllipsisVerticalIcon } from "react-native-heroicons/solid";
import MessageItem from "../../components/Chat/MessageItem";
import tw from "twrnc";
import { useColor } from "../../context/ColorContext";
const messages = [
  {
    id: "1",
    name: "Minh Toàn",
    message: "Hey! I'm in the city today.",
    time: "12:14",
    avatar: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png", // ví dụ
    isOnline: true,
  },
  {
    id: "2",
    name: "Bá Dân",
    message: "Hey! I'm in the city today.",
    time: "12:14",
    avatar: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png", // ví dụ
    isOnline: true,
  },
  {
    id: "3",
    name: "Quang Phu",
    message: "Hey! I'm in the city today.",
    time: "12:14",
    avatar: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png", // ví dụ
    isOnline: true,
  },
  {
    id: "4",
    name: "Ngọc Lân",
    message: "Hey! I'm in the city today.",
    time: "12:14",
    avatar: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png", // ví dụ
    isOnline: true,
  },
];

export default function ChatListScreen() {
  const navigation = useNavigation();
  const { setStatusBarColor } = useColor();
  useFocusEffect(
    useCallback(() => {
      setStatusBarColor("#22c55e");

      return () => {
        setStatusBarColor("");
      };
    }, [])
  );

  return (
    <View className="bg-white flex-1">
      <View className="py-4 bg-green-500 flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "facebook-sans-bold" }}
          className="text-3xl text-white ml-4"
        >
          Tin nhắn
        </Text>
        <EllipsisVerticalIcon color="#fff" size={24} strokeWidth={2.5} />
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChatDetail", {
                chatId: item.id,
                name: item.name,
              })
            }
            className="flex-row items-center py-4 border-b border-gray-100"
          >
            <MessageItem item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
