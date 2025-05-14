import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BanknotesIcon, ArrowsRightLeftIcon, WalletIcon, DocumentTextIcon, ClockIcon, CalendarIcon } from "react-native-heroicons/outline";

import Button from "../../../components/Button/Button";
import Header from "../../../components/Header/Header";
import { ChevronRightIcon } from "react-native-heroicons/solid";

const WalletScreen = () => {
  const navigation = useNavigation(); 

  const walletListItem = [
    {
      icon: <WalletIcon size={22} color="gray" />,
      content: "Quản lý tài khoản ngân hàng",
      link: "EscrowAccount",
    },
    {
      icon: <WalletIcon size={22} color="gray" />,
      content: "Tài khoản ký quỹ",
      link: "EscrowAccount",
    },
    {
      icon: <ClockIcon size={22} color="gray" />,
      content: "Giao dịch",
      link: "Transactions",
    },
    {
      icon: <DocumentTextIcon size={22} color="gray" />,
      content: "Báo cáo thu nhập",
      link: "IncomeReport",
    },
    {
      icon: <CalendarIcon size={22} color="gray" />,
      content: "Lịch sử nạp & rút tiền",
      link: "DepositWithdrawHistory",
    },
  ];

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView className="flex-1 bg-white px-4">
      <Header value="Quản lý ví" />


      <View className="py-6">
        <Text className="text-lg font-bold">Tài khoản chính</Text>
        <Text className="text-sm text-gray-600">0 đ</Text>
      </View>


      <View className="flex-row justify-center gap-4 mt-2">
        <Button
          content={
            <View className="flex-row items-center">
              <BanknotesIcon size={16} color="white" />
              <Text className="ml-2 text-white text-sm font-semibold">Nạp tiền</Text>
            </View>
          }
          bgClass="bg-black"
          widthClass="w-[150px]"
          heightClass="h-10"
          onPress={() => handleNavigation("Deposit")}
        />

        <Button
          content={
            <View className="flex-row items-center">
              <ArrowsRightLeftIcon size={16} color="white" />
              <Text className="ml-2 text-white text-sm font-semibold">Rút tiền</Text>
            </View>
          }
          bgClass="bg-black"
          widthClass="w-[150px]"
          heightClass="h-10"
          onPress={() => handleNavigation("Withdraw")}
        />
      </View>

      {/* Danh sách các mục ví */}
<View className="border-t-[0.5px] border-t-gray-300 py-4 mt-4">
        {walletListItem.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between rounded-xl px-2 py-3 mx-2 my-1"
            onPress={() => handleNavigation(item.link)}
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
    </ScrollView>
  );
};

export default WalletScreen;
