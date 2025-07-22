import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPartners } from "../../api/user/getPartners";
import { useAuth } from "../../context/AuthContext";

export default function PartnerListScreen() {
  const [partners, setPartners] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuth();
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(user.id, token);
        const data = await getPartners(user.id, token);
        setPartners(data);
      } catch (error) {
        console.log("Lỗi khi load danh sách partner:", error.message);
      }
    };

    fetchPartners();
  }, []);

  return (
    <View className="flex-1 bg-white ">
      <View className="py-4 bg-green-500 flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "facebook-sans-bold" }}
          className="text-3xl text-white ml-4 mt-6"
        >
          Tin nhắn
        </Text>
      </View>
      <View className="flex-row justify-between mt-4 px-4"></View>
      <FlatList
        data={partners}
        keyExtractor={(item) => item.partnerId}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row items-center p-3 mb-2 rounded-xl"
            onPress={() =>
              navigation.navigate("ChatDetail", {
                partnerName: item.fullName,
                messages: item.messages,
                partnerId: item.partnerId,
              })
            }
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
              }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <Text className="text-base font-medium">{item.fullName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
