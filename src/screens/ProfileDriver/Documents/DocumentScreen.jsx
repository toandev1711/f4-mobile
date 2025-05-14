import React from "react";
import { View, Text, ScrollView } from "react-native";
import Header from "../../../components/Header/Header";
import DocumentCard from "../../../components/ProfileDriver/DocumentCard";
import Button from "../../../components/Button/Button";
import { ExclamationTriangleIcon, ArrowUpTrayIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const DocumentScreen = () => {
  const navigation = useNavigation();

  const documents = [
    {
      documenttype: "Giấy phép lái xe",
      id: "123456789",
      issueDate: "01/01/2024",
      expiryDate: "01/01/2030",
      status: "Đã xác minh",
    },
  ];

  const handleUpload = () => {
    console.log("Upload button clicked");
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Header value="Giấy tờ" />

      {/* Cảnh báo */}
      <View className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex-row items-start space-x-3 rounded-md mb-4">
        <ExclamationTriangleIcon size={20} color="#D97706" />
        <View className="flex-1">
          <Text className="text-sm font-medium text-yellow-800">Cần chú ý</Text>
          <Text className="text-sm text-yellow-700">
            Bạn có giấy tờ đang chờ xác minh hoặc sắp hết hạn. Vui lòng cập nhật để đảm bảo tài khoản của bạn hoạt động bình thường.
          </Text>
        </View>
      </View>

      {/* Danh sách giấy tờ */}
      {documents.map((doc, index) => (
        <DocumentCard
          key={index}
          title={doc.documenttype}
          id={doc.id}
          issueDate={doc.issueDate}
          expiryDate={doc.expiryDate}
          status={doc.status}
          onPress={() => navigation.navigate("DocumentDetail",doc)}
        />
      ))}

      {/* Nút Upload */}
      <View className="mt-4 items-center">
        <Button
          widthClass="w-32"
          heightClass="h-10"
          bgClass="bg-blue-600"
          textColor="text-white"
          textSize="text-sm"
          content={
            <View className="flex-row items-center">
              <ArrowUpTrayIcon size={16} color="white" className="mr-1" />
              <Text className="text-white font-semibold">Tải lên</Text>
            </View>
          }
          onPress={handleUpload}
        />
      </View>
    </ScrollView>
  );
};

export default DocumentScreen;
