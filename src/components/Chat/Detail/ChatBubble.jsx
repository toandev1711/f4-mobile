import { View, Text } from "react-native";

export default function ChatBubble({ item }) {
  const isMe = item.sender === 'me';

  return (
    <View className={`px-4 mb-2 flex-row ${isMe ? 'justify-end' : 'justify-start'}`}>
      <View className={`max-w-[70%] p-3 rounded-xl ${isMe ? 'bg-green-500 rounded-tr-none' : 'bg-gray-100 rounded-tl-none'}`}>
        <Text className={`text-sm ${isMe ? 'text-white' : 'text-gray-800'}`}>{item.text}</Text>
        <Text className={`text-[10px] mt-1 text-right ${isMe ? 'text-purple-100' : 'text-gray-400'}`}>{item.time}</Text>
      </View>
    </View>
  );
}
