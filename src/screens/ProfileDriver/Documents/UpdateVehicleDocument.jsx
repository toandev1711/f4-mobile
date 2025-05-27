import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { updateImage } from "../../../api/DriverInfo/saveImg";
import { updateVehicleData } from "../../../api/DriverInfo/updateVehicle";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../../components/SignIUComponents/InputField";
import Button from "../../../components/SignIUComponents/Button";
import Header from "../../../components/Header/Header";
import DatePickerField from "../../../components/ProfileDriver/DatePickerField";
import ImagePickers from "../../../components/ProfileDriver/ImagePicker";

const UpdateVehicleDocument = ({ route }) => {
  const navigation = useNavigation();
  const {
    licensePlateNumber: paramLicensePlateNumber,
    ownerName: paramOwnerName,
    brand: paramBrand,
    engineNumber: paramEngineNumber,
    issueDate: paramIssueDate,
    frontPhoto: paramFrontPhoto,
    backPhoto: paramBackPhoto,
    vehicleId: vehicleId
  } = route.params || {};

  const [licensePlateNumber, setLicensePlateNumber] = useState(paramLicensePlateNumber || "");
  const [ownerName, setOwnerName] = useState(paramOwnerName || "");
  const [brand, setBrand] = useState(paramBrand || "");
  const [engineNumber, setEngineNumber] = useState(paramEngineNumber || "");

  const parseDate = (str) => {
    if (!str) return new Date();
    const d = new Date(str);
    return isNaN(d) ? new Date() : d;
  };

  const [issueDate, setIssueDate] = useState(parseDate(paramIssueDate));
  const [showIssuePicker, setShowIssuePicker] = useState(false);

  const [frontImage, setFrontImage] = useState({ uri: paramFrontPhoto });
  const [backImage, setBackImage] = useState({ uri: paramBackPhoto });
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    const d = date instanceof Date ? date : new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      let frontPhotoUrl = frontImage.uri;
      let backPhotoUrl = backImage.uri;

      if (frontImage.file) {
        const formData = new FormData();
        formData.append("newImage", {
          uri: frontImage.file.uri,
          name: "front.jpg",
          type: "image/jpeg",
        });
        formData.append("oldUrl", paramFrontPhoto);
        const result = await updateImage(formData);
        frontPhotoUrl = result;
      }

      if (backImage.file) {
        const formData = new FormData();
        formData.append("newImage", {
          uri: backImage.file.uri,
          name: "back.jpg",
          type: "image/jpeg",
        });
        formData.append("oldUrl", paramBackPhoto);
        const result = await updateImage(formData);
        backPhotoUrl = result;
      }

      const updatedData = {
        licensePlateNumber,
        ownerName,
        brand,
        engineNumber,
        frontPhoto: frontPhotoUrl,
        backPhoto: backPhotoUrl,
        issueDate: formatDate(issueDate),
        vehicleTypeId: 3,
      };

      await updateVehicleData(vehicleId, updatedData);
      Alert.alert("Thành công", "Cập nhật thông tin xe thành công!");
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi cập nhật xe:", error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin xe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Header value="Cập nhật thông tin xe" />

      <Text className="text-sm font-semibold text-gray-600 mb-1">Biển số xe</Text>
      <InputField
        placeholder="30A12345"
        value={licensePlateNumber}
        onChangeText={setLicensePlateNumber}
        icon="car"
      />

      <Text className="text-sm font-semibold text-gray-600 mt-3 mb-1">Chủ sở hữu</Text>
      <InputField
        placeholder="Nguyen Van An"
        value={ownerName}
        onChangeText={setOwnerName}
        icon="account"
      />

      <Text className="text-sm font-semibold text-gray-600 mt-3 mb-1">Hãng xe</Text>
      <InputField
        placeholder="Toyota"
        value={brand}
        onChangeText={setBrand}
        icon="car-multiple"
      />

      <Text className="text-sm font-semibold text-gray-600 mt-3 mb-1">Số máy</Text>
      <InputField
        placeholder="EN123456789"
        value={engineNumber}
        onChangeText={setEngineNumber}
        icon="engine"
      />

      <DatePickerField
        label="Ngày cấp"
        date={issueDate}
        onShowPicker={() => setShowIssuePicker(true)}
        showPicker={showIssuePicker}
        onChange={(event, selectedDate) => {
          setShowIssuePicker(Platform.OS === "ios");
          if (selectedDate) setIssueDate(selectedDate);
        }}
      />

      <ImagePickers
        image={frontImage}
        onImageChange={setFrontImage}
        label="Ảnh mặt trước"
      />

      <ImagePickers
        image={backImage}
        onImageChange={setBackImage}
        label="Ảnh mặt sau"
      />

      <Button title="Cập nhật phương tiện" onPress={handleUpdate} loading={loading} />
    </ScrollView>
  );
};

export default UpdateVehicleDocument;
