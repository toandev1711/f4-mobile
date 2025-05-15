import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  MapPinIcon,
  ClockIcon,
  UserPlusIcon,
  ChartBarIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/solid";

const TransportScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="bg-green-100 h-56 px-4 pt-12">
        <View className="flex-row align-center">
          <TouchableOpacity className="justify-center items-center mr-3">
            <ChevronLeftIcon size={23} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Transport</Text>
        </View>
        <Text className="text-sm text-gray-600">
          Wherever you're going, let's get you there!
        </Text>

        <View className="absolute left-4 right-4 bottom-0 transform translate-y-1/2">
          <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-lg">
            <ClockIcon size={20} color="#EF4444" className="mr-2" />
            <Text className="flex-1 text-base text-gray-800">Where to?</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-gray-700 mr-1">Now</Text>
              <ClockIcon size={16} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView className="flex-1 mt-11 px-4">
        <View className="space-y-4">
          <View className="flex-row items-center mb-4">
            <ClockIcon size={20} color="gray" className="mt-1" />
            <View className="ml-3">
              <Text className="font-semibold">40 Nguyen Sinh Cung St.</Text>
              <Text className="text-sm text-gray-500">
                40 Nguyễn Sinh Cung, P.Vỹ Dạ, Tp.Huế, Thừa Thiên Huế
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <ClockIcon size={20} color="gray" className="mt-1" />
            <View className="ml-3">
              <Text className="font-semibold">338 Phan Chu Trinh St.</Text>
              <Text className="text-sm text-gray-500">
                338 Phan Chu Trinh, P.An Cựu, Tp.Huế, Thừa Thiên Huế
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <ClockIcon size={20} color="gray" className="mt-1" />
            <View className="ml-3">
              <Text className="font-semibold">20 Vo Thi Sau St.</Text>
              <Text className="text-sm text-gray-500">
                20 Võ Thị Sáu, P.Phú Hội, Tp.Huế, Thừa Thiên Huế
              </Text>
            </View>
          </View>
        </View>
        <View className=" pb-12">
          <Text className="font-semibold text-lg mb-4">
            Rides for your every need
          </Text>
          <View className="flex-row flex-wrap justify-between gap-3">
            <View className="bg-blue-100 rounded-xl p-4 w-[48%]">
              <Text className="font-semibold mb-2">Advance Booking</Text>
              <ClockIcon size={24} color="#2563EB" />
            </View>

            <View className="bg-yellow-100 rounded-xl p-4 w-[48%]">
              <Text className="font-semibold mb-2">Book for Family</Text>
              <ClockIcon size={24} color="#CA8A04" />
            </View>

            <View className="bg-orange-100 rounded-xl p-4 w-[48%]">
              <Text className="font-semibold mb-2">Car Plus</Text>
              <ClockIcon size={24} color="#EA580C" />
            </View>
            <View className="bg-green-100 rounded-xl p-4 w-[48%]">
              <Text className="font-semibold mb-2">7 seater car</Text>
              <ClockIcon size={24} color="#16A34A" />
            </View>
            <View className="bg-blue-50 rounded-xl p-4 w-full mt-2">
              <Text className="font-semibold mb-2">Airport pickup</Text>
              <ClockIcon size={24} color="#0EA5E9" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransportScreen;
