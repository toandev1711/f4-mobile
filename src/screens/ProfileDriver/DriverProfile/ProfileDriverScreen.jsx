import React from "react";
import { View, Text, ScrollView } from "react-native";
import ProfileCard from "../../../components/ProfileDriver/ProfileCard";
import StatsCard from "../../../components/ProfileDriver/StatsCard";
import { useNavigation } from "@react-navigation/native";

const ProfileDriverScreen = () => {
    const navigation = useNavigation();
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="h-28 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-b-2xl" />
      <ProfileCard
        name="Minh Toàn "
        phone="123123123"
        rating="4.8"
        totalReviews={342}
        onPress={() => navigation.navigate("EditProfileDriver")}
      />

      <Text className="text-xl font-bold text-gray-800 mt-4 mb-2 mx-4">Tổng quan</Text>

      <StatsCard
        label="Chuyến đi hoàn thành"
        value="1245"
        percentage="5%"
        iconName="people-outline"
      />
      <StatsCard
        label="Tổng thu nhập"
        value="100.000.000đ"
        percentage="12%"
        iconName="cash-outline"
      />
      <StatsCard
        label="Đánh giá trung bình"
        value="4.55"
        percentage="20%"
        iconName="star-outline"
      />
    </ScrollView>
  );
};

export default ProfileDriverScreen;
