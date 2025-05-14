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
  ClockIcon,
  WalletIcon,
  TruckIcon,
  IdentificationIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import CircleAvatar from "../../../components/CircleAvatar/CircleAvtar";
import Button from "../../../components/Button/Button";

const DriverProfileScreen = () => {
  const navigation = useNavigation();
  const [profileListItem] = useState([
  {
    icon: <Cog6ToothIcon size={22} color="gray" />,
    content: "Cài đặt",
    screen: "Settings",
  },
  {
    icon: <ClockIcon size={22} color="gray" />,
    content: "Lịch sử đơn hàng",
    screen: "OrderHistory",
  },
  {
    icon: <WalletIcon size={22} color="gray" />,
    content: "Ví",
    screen: "Wallet",
  },
  {
    icon: <TruckIcon size={22} color="gray" />,
    content: "Thông tin xe",
    screen: "CarInfo",
  },
  {
    icon: <IdentificationIcon size={22} color="gray" />,
    content: "Giấy tờ cá nhân",
    screen: "Document",
  },
  {
    icon: <QuestionMarkCircleIcon size={22} color="gray" />,
    content: "Hỗ trợ và trợ giúp",
    screen: "Support",
  },
  {
    icon: <ArrowRightOnRectangleIcon size={22} color="gray" />,
    content: "Đăng xuất",
    screen: "Logout",
  },
  ]);

  const goToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="p-4">
          <View className="flex flex-col items-center justify-center">
            <Text className="p-5 font-bold text-lg">Profile</Text>
            <CircleAvatar />
            <View className="profileInfo p-5 flex items-center">
              <Text className="font-bold text-lg">Driver Profile</Text>
              <Text className="text-sm">@f4delivery</Text>
            </View>
          </View>
          <View className="w-full flex justify-center items-center">
            <Button
              content="Edit Profile"
              bgClass="bg-black"
              onPress={goToEditProfile}
            />
          </View>
          <View className="border-t-[0.5px] border-t-gray-300 py-4 mt-4">
            {profileListItem.map((item, index) => (
              <TouchableOpacity
                key={index}
                 onPress={() => navigation.navigate(item.screen)}
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

export default DriverProfileScreen;
