// DriverMapScreen.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatBubbleOvalLeftEllipsisIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useLocation } from "../../context/LocationContext";
export default function DriverAcceptedScreen() {
  const { pickUp } = useLocation();
  const driverLocation = {
    latitude: pickUp.lat || 10.7769,
    longitude: pickUp.lng || 106.6959,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={driverLocation}
        showsUserLocation={true}
      >
        <Marker coordinate={driverLocation} title="Tài xế" />
      </MapView>
      <View className="absolute bottom-0 w-full bg-white px-5 py-6 rounded-t-2xl shadow-2xl flex-row items-start space-x-4">
        <View className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-3">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
            }}
            className="w-full h-full"
          />
        </View>

        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900">
            Lê Văn Minh Toàn
          </Text>
          <Text className="text-gray-600 mt-1">Đánh giá: ⭐ 5.0 / 5.0</Text>
          <Text className="text-gray-600 mt-1">Biển số xe: 59A1-123.45</Text>
        </View>
        <TouchableOpacity
          className="mt-3 bg-green-500 rounded-2-xl p-3 items-center flex-row space-x-2 rounded-2xl"
          onPress={() => navigation.navigate("MessageList")}
        >
          <ChatBubbleOvalLeftEllipsisIcon size={24} color="white" />
          <Text className="text-white font-semibold text-base">Nhắn tin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles (dùng thay cho Tailwind nếu Tailwind chưa hoạt động)
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  panel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  text: {
    fontSize: 16,
    color: "#444",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#3B82F6",
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
