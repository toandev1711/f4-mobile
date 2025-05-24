import { View, Text, Image } from "react-native";

const MessageItem = ({ item }) => {
  return (
    <View className="flex-row items-center py-2 px-4">
      <View className="relative">
        <Image
          source={{ uri: item.avatar }}
          className="w-12 h-12 rounded-full"
        />
        {item.isOnline && (
          <View className="absolute right-0 bottom-0 w-3 h-3 rounded-full bg-green-500 border border-white" />
        )}
      </View>

      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold text-gray-800">
          {item.name}
        </Text>
        <Text className="text-sm text-gray-500">{item.message}</Text>
      </View>

      <Text className="text-xs text-gray-400">{item.time}</Text>
    </View>
  );
};

export default MessageItem;
