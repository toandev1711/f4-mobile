import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  Cog6ToothIcon,
  ChevronRightIcon,
  QueueListIcon,
  MapPinIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import CircleAvatar from "../../components/CircleAvatar/CircleAvtar";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
const UserProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [profileListItem] = useState([
    { icon: <Cog6ToothIcon size={22} color="gray" />, content: "Setting" },
    { icon: <QueueListIcon size={22} color="gray" />, content: "My Orders" },
    { icon: <MapPinIcon size={22} color="gray" />, content: "Address" },
    {
      icon: <LockClosedIcon size={22} color="gray" />,
      content: "Change Password",
    },
    {
      icon: <QuestionMarkCircleIcon size={22} color="gray" />,
      content: "Help & Support",
    },
    {
      icon: <ArrowRightOnRectangleIcon size={22} color="gray" />,
      func : logout,
      content: "Logout",
    },
  ]);

  const goToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="px-4 py-1">
          <View className="flex flex-col items-center justify-center">
            <Text className="p-5 font-bold text-xl">Hồ sơ của bạn</Text>
            <CircleAvatar url={user.profilePicture || ''}/>
            <View className="profileInfo p-5 flex items-center">
              <Text className="font-bold text-lg">{user.fullName}</Text>
              <Text className="text-sm">ID: {user.userNumber}</Text>
            </View>
          </View>
          <View className="w-full flex justify-center items-center">
            <Button
              content="Chỉnh sửa chi tiết"
              bgClass="bg-black"
              onPress={goToEditProfile}
            
            />
          </View>
          <View className="border-t-[0.5px] border-t-gray-300 py-4 mt-4">
            {profileListItem.map((item, index) => (
              <TouchableOpacity
                onPress={item.func}
                key={index}
                className="flex-row items-center justify-between rounded-xl px-2 py-3 mx-2 my-1"
              >
                <View className="flex-row items-center">
                  {item.icon}
                  <Text className="ml-2 text-gray-800 text-base">
                    {item.content}
                  </Text>
                </View>
                <ChevronRightIcon size={18} color="#1f2937" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;