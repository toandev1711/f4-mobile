import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSocket } from "../../context/SocketContext";
import { PhoneIcon, VideoCameraIcon } from "react-native-heroicons/solid";
import { Image } from "react-native";
export default function ChatDetailScreen() {
  const route = useRoute();
  const { partnerName, messages: initialMessages, partnerId } = route.params;
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef();

  const { sendMessage, messages: allMessages } = useSocket();

  // Kết hợp tin nhắn cũ + tin nhắn mới từ WS
  // Lọc theo partnerId và sắp xếp tăng dần theo timestamp
  const combinedMessages = [...(initialMessages || []), ...allMessages];

  const filteredMessages = combinedMessages
    .filter((m) => m.senderId === partnerId || m.receiverId === partnerId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Scroll xuống dưới khi messages thay đổi
  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, [filteredMessages]);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    sendMessage(partnerId, inputText);
    setInputText("");
  };

  const renderItem = ({ item }) => {
    const isFromPartner = item.senderId === partnerId;
    return (
      <View
        className={`p-3 rounded-xl my-1 max-w-[75%] ${
          isFromPartner ? "bg-gray-200 self-start" : "bg-green-500 self-end"
        }`}
      >
        <Text className={isFromPartner ? "text-black" : "text-white"}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="text-lg font-bold mb-4 bg-green-500 text-white p-4 flex-row justify-between items-center">
        <View className="flex-row">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
            }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <Text className="text-sm font-medium text-white">
            {partnerName}
            {"\n"} Đang hoạt động
          </Text>
        </View>
        <View className="flex-row">
          <View className="mr-2">
            <PhoneIcon color="#fff" size={17} />
          </View>
          <VideoCameraIcon className="ml-2" color="#fff" size={17} />
        </View>
      </View>
      <View className="flex-1 p-4">
        <FlatList
          ref={flatListRef}
          data={filteredMessages}
          keyExtractor={(item) => item.id || item.timestamp}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </View>

      {/* Ô nhập và nút gửi */}
      <View className="flex-row items-center p-3 border-t border-gray-200 bg-white">
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Nhập tin nhắn..."
          className="flex-1 p-3 bg-gray-100 rounded-xl text-base"
        />
        <TouchableOpacity
          onPress={handleSend}
          className="ml-3 bg-green-500 px-4 py-2 rounded-xl"
        >
          <Text className="text-white font-semibold">Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
