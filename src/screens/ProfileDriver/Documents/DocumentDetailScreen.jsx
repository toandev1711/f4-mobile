import React from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header/Header";
import DocumentInfo from "../../../components/ProfileDriver/DocumentInfo";
import DocumentImages from "../../../components/DocumentImage/DocumentImages";
import UpdateInstructions from "../../../components/ProfileDriver/UpdateInstructions";
import Button from "../../../components/Button/Button";

const DocumentDetailScreen = ({ route }) => {
  const navigation = useNavigation();

  const {
    documenttype,
    driverId,
    statusName,
    issueDate,
    createAt,
    frontPhoto,
    backPhoto,
    vehicleId,
    licensePlateNumber,
    ownerName,
    brand,
    engineNumber,
    vehicleTypeName,
      id,
      licenseCarId,
      licenseClass,
      place,
      expiryDate,
      nationality,
      identifierId,
  } = route.params;

  const getDocumentType = (type) => {
    switch (type) {
      case "Giấy phép lái xe":
        return "license";
      case "Căn cước công dân":
        return "personal";
      case "Thông Tin Xe":
        return "vehicle";
      default:
        return "unknown";
    }
  };

  const type = getDocumentType(documenttype);

  let documentData = {
    title: documenttype,
    type,
    driverId,
    statusName,
    issueDate,
    createAt,
    frontPhoto,
    backPhoto,
  };

  if (type === "vehicle") {
    documentData = {
      ...documentData,
      vehicleId,
      licensePlateNumber,
      ownerName,
      brand,
      engineNumber,
      vehicleTypeName,
    };
  }

  if (type === "license") {
    documentData = {
      ...documentData,
      id,
      licenseCarId,
      licenseClass,
      place,
      expiryDate,
      nationality,
    };
  }

  if (type === "personal") {
    documentData = {
      ...documentData,
      identifierId,
      id,
    };
  }

  const handleUpdate = () => {
     if (type === "license") {
      navigation.navigate("UpdateLicenseDocument", {
      id: id,
      licenseCarId: licenseCarId,
      licenseClass: licenseClass,
      place: place,
      expiryDate: expiryDate,
      nationality:nationality,
      title: documenttype,
      type: "license",
      driverId: driverId,
      statusName: statusName,
      issueDate: issueDate,
      createAt: createAt,
      frontPhoto: frontPhoto,
      backPhoto: backPhoto,
      });
    }else if(type ==="personal"){
      navigation.navigate("UpdatePersonalDocument", {
      id: id,
      title: documenttype,
      type: "personal",
      driverId: driverId,
      statusName: statusName,
      issueDate: issueDate,
      createAt: createAt,
      frontPhoto: frontPhoto,
      backPhoto: backPhoto,
      });
    }else if(type ==="vehicle"){
      navigation.navigate("UpdateVehicleDocument", {
      title: documenttype,
      type: "vehicle",
      driverId: driverId,
      statusName: statusName,
      issueDate: issueDate,
      createAt: createAt,
      frontPhoto: frontPhoto,
      backPhoto: backPhoto,
      vehicleId: vehicleId,
      licensePlateNumber: licensePlateNumber,
      ownerName: ownerName,
      brand: brand,
      engineNumber: engineNumber,
      vehicleTypeName: vehicleTypeName,
      frontPhoto: frontPhoto,
      backPhoto: backPhoto,
      });
    }
     else {
      console.warn("Không xác định loại giấy tờ để cập nhật.");
    }
  };


  return (
    <View className="flex-1 bg-gray-100">
      <Header value="Chi tiết giấy tờ"/>

      <ScrollView className="flex-1 p-4">
        <DocumentInfo {...documentData} />
        <DocumentImages frontPhoto={frontPhoto} backPhoto={backPhoto} />
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
