import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import {
  MapPinIcon,
  ClockIcon,
  ChevronLeftIcon,
  UserPlusIcon,
  ChartBarIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import RecentAddress from "../../components/Transport/RecentAddress/RecentAddress";
import RideOption from "../../components/Transport/RideOption/RideOption";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const TransportScreen = () => {
  const [recentAddressList, setRecentAddressList] = useState([
    {
      display: "40 Nguyen Sinh Cung St.",
      detail: "40 Nguyễn Sinh Cung, P.Vỹ Dạ, Tp.Huế, Thừa Thiên Huế",
    },
    {
      display: "40 Le Loi St.",
      detail: "40 Nguyễn Sinh Cung, P.Vỹ Dạ, Tp.Huế, Thừa Thiên Huế",
    },
    {
      display: "40 Vo thi sau",
      detail: "40 Nguyễn Sinh Cung, P.Vỹ Dạ, Tp.Huế, Thừa Thiên Huế",
    },
    {
      display: "421 Phan chu trinh.",
      detail: "40 Nguyễn Sinh Cung, P.Vỹ Dạ, Tp.Huế, Thừa Thiên Huế",
    },
  ]);
  const [rideOption, setRideOption] = useState([
    { text: "Advanced booking", icon: <ClockIcon size={24} color="#2563EB" /> },
    { text: "Take your trip", icon: <ClockIcon size={24} color="#2563EB" /> },
    { text: "Delivery with us", icon: <ClockIcon size={24} color="#2563EB" /> },
  ]);
  const navigation = useNavigation();
  const navigateSearchSreen = () => {
    navigation.navigate("SearchLocation", {
      recentAddressList: recentAddressList,
    });
  };
  return (
    <View className="flex-1 bg-white">
      <View className="bg-green-100 h-56 px-4 pt-12">
        <View className="flex-row align-center">
          <TouchableOpacity
            className="justify-center items-center mr-3"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={23} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Vận chuyển</Text>
        </View>
        <Text className="text-sm text-gray-600">
          Bất kể nơi nào bạn muốn đi, chúng tôi có ở đó!
        </Text>
        <Image
          source={require("../../../assets/img/transport_1.png")}
          className="absolute w-40 h-20 bottom-6 right-10"
        />
        <TouchableOpacity
          className="absolute left-4 right-4 bottom-0 transform translate-y-1/2"
          onPress={() => navigateSearchSreen()}
        >
          <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-lg">
            <ClockIcon size={20} color="#EF4444" className="mr-3" />
            <Text className="flex-1 text-base text-gray-800 ml-2">
              Đi đâu nhỉ?
            </Text>
            <TouchableOpacity className="flex-row items-center bg-green-300 py-2 px-3 rounded-full">
              <Text className="text-gray-700 mr-1">Bây giờ</Text>
              <ClockIcon size={16} color="gray" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 mt-11 px-4">
        <View>
          {recentAddressList.map((item, index) => (
            <RecentAddress item={item} key={index} />
          ))}
        </View>
        <View className="mt-5 pb-12">
          <Text className="font-semibold text-lg mb-4">Gợi ý dịch vụ</Text>
          <View className="flex-row flex-wrap justify-between gap-3">
            {rideOption.map((item, index) => (
              <RideOption icon={item.icon} text={item.text} key={index} />
            ))}
            <View className="bg-blue-100 rounded-xl p-4 w-[48%]">
              <Text className="font-semibold mb-2">Đặt xe nâng cao</Text>
              <ClockIcon size={24} color="#2563EB" />
            </View>
            <View className="bg-blue-50 rounded-xl p-4 w-full mt-2">
              <Text className="font-semibold mb-2">Đón ở sân bay</Text>
              <ClockIcon size={24} color="#0EA5E9" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransportScreen;
