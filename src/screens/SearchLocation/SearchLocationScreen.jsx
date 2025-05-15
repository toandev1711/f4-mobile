import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { ChevronLeftIcon, ClockIcon, MapPinIcon,  PlusCircleIcon } from "react-native-heroicons/solid";
import SearchAddressInput from "../../components/SearchAddressInput/SearchAddressInput";
import { LocalSvg } from "react-native-svg";

const locations = [
  {
    name: "250, Huynh Van Nghe St.",
    address:
      "Huỳnh Văn Nghệ, P.Hòa Hải, Q.Ngũ Hành Sơn, Đà Nẵng, 50000, Vietnam",
    distance: "0.0km",
  },
  {
    name: "45/46 Street K20",
    address:
      "45/46 Đường K20, P.Khuê Mỹ, Q.Ngũ Hành Sơn, Đà Nẵng, 50000, Vietnam",
    distance: "4.8km",
  },
  {
    name: "20 Vo Thi Sau St.",
    address: "20 Võ Thị Sáu, P.Phú Hội, Tp.Huế, Thừa Thiên Huế, 49000, Vietnam",
    distance: "89km",
  },
  // Thêm các địa điểm khác tương tự
];

export default function SearchLocationScreen({ navigation }) {
  return (
    <View className="flex-1 bg-white ">
      <View className="flex-row">
        <View className = "items-center w-10">
            <ChevronLeftIcon className="absolute left-0 top-2.5" size={24}/>
        </View>
        <View className = "flex-1">
          <SearchAddressInput
            icon={MapPinIcon}
            text="Hue"
            placeholder="Current Location"
            dotColor='bg-blue-600'
            iconColor = '#e92222'
          />
          <SearchAddressInput
            icon={PlusCircleIcon}
            placeholder="search your place"
            background="bg-gray-100"
            dotColor='bg-red-500'
            text='Add'
          />
        </View>
      </View>

      {/* Tabs */}
      <View className = "px-2">

      <View className="flex-row space-x-6 my-3 items-center">
        <Text className="text-green-600 font-semibold p-2 rounded-3xl bg-green-400 mr-2">Recent</Text>
        <Text className="text-gray-400 mr-2">Suggested</Text>
        <Text className="text-gray-400">Saved</Text>
      </View>

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {locations.map((item, idx) => (
          <View key={idx} className="flex-row py-3 items-center border-b border-gray-300">
            {/* Distance & Icon */}
            <View className="items-center w-10">
              <Clock size={20} color="#60A5FA" />
              <Text className="text-xs text-gray-500 mt-1">
                {item.distance}
              </Text>
            </View>

            {/* Address Info */}
            <View className="flex-1 ml-3">
              <Text className="font-semibold text-black">{item.name}</Text>
              <Text className="text-sm text-gray-500">{item.address}</Text>
            </View>

            {/* Options */}
            <TouchableOpacity className="px-2 items-center">
              <Text className="text-2xl text-gray-400">⋮</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>

      </View>

  );
}
