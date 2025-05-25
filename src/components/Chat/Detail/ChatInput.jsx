import { View, TextInput, TouchableOpacity } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";

export default function ChatInput() {
  return (
    <View className="flex-row items-center px-4 py-3 border-t border-gray-200 bg-white">
      <TextInput
        placeholder="Type a message..."
        placeholderTextColor="#555"
        className="flex-1 bg-gray-100 px-4 py-3 rounded-full text-base text-gray-800"
        style={{ lineHeight: 20, fontSize: 16, paddingVertical: 8 }}
      />
      <TouchableOpacity className="ml-2 p-2 bg-green-500 rounded-full">
        <ArrowRightIcon color="white" size={20} />
      </TouchableOpacity>
    </View>
  );
}
