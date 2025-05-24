import { View, Text, Image, TouchableOpacity } from "react-native";
import { PhoneIcon, VideoCameraIcon, ChevronLeftIcon } from "react-native-heroicons/outline";

export default function ChatHeader() {
  return (
    <View className="flex-row items-center px-5 py-3 border-b border-gray-200 bg-white">

      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png" }}
        className="w-10 h-10 rounded-full"
      />
      <View className="ml-3 flex-1">
        <Text className="text-sm font-semibold text-gray-900">Steven Webb</Text>
        <Text className="text-xs text-gray-400">Seen 5 minutes ago</Text>
      </View>
      <TouchableOpacity className="p-2">
        <PhoneIcon size={20} color="#888" />
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <VideoCameraIcon size={20} color="#888" />
      </TouchableOpacity>
    </View>
  );
}
