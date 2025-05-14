import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../../../components/Header/Header";
import DocumentInfo from "../../../components/ProfileDriver/DocumentInfo";
import DocumentImages from "../../../components/DocumentImage/DocumentImages";
import UpdateInstructions from "../../../components/ProfileDriver/UpdateInstructions";
import Button from "../../../components/Button/Button";

const DocumentDetailScreen = ({ route }) => {
  const {
    documenttype,
    id,
    issueDate,
    expiryDate,
    status,
    vehicleId,
    vehicleType,
    vehicleColor,
    registrationDate,
    issuedPlace,
    ownerName,
    number,
    birthDate,
    gender,
    residence,
  } = route.params;

  const getDocumentType = (type) => {
    switch (type) {
      case "Giấy phép lái xe":
        return "license";
      case "Giấy tờ cá nhân":
        return "personal";
      case "Giấy đăng ký xe":
        return "vehicle";
      default:
        return "vehicle";
    }
  };

  const type = getDocumentType(documenttype);

  const documentData = {
    title: documenttype,
    status,
    id,
    licensePlate: vehicleId,
    vehicleType,
    vehicleColor,
    registrationDate,
    expiryDate,
    issuedPlace,
    name: ownerName,
    number,
    birthDate,
    gender,
    residence,
    issuedDate: issueDate,
  };

  const handleUpdate = () => {
    console.log("Cập nhật giấy tờ");
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Header value="Chi tiết giấy tờ" tail="Cập nhật" onClick={handleUpdate} />

      <ScrollView className="flex-1 p-4">
        <DocumentInfo type={type} {...documentData} />
        <DocumentImages />
        <UpdateInstructions />
      </ScrollView>

      <Button
        content="Tải lên"
        onPress={handleUpdate}
        widthClass="w-full"
        heightClass="h-12"
        bgClass="bg-blue-600"
        textColor="text-white"
        textSize="text-base"
      />
    </View>
  );
};

export default DocumentDetailScreen;
