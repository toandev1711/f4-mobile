import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { updateImage } from "../../../api/DriverInfo/saveImg";
import { updateLicenseData } from "../../../api/DriverInfo/updateLicence";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../../components/SignIUComponents/InputField";
import Button from "../../../components/SignIUComponents/Button";
import Header from "../../../components/Header/Header";
import DatePickerField from "../../../components/ProfileDriver/DatePickerField";
import ImagePickers from "../../../components/ProfileDriver/ImagePicker";

const UpdateLicenseDocument = ({ route }) => {
  const navigation = useNavigation();
  const {
    id: paramLicenseNumber,
    licenseClass: paramLicenseClass,
    place: paramPlace,
    expiryDate: paramExpiryDate,
    nationality: paramNationality,
    issueDate: paramIssueDate,
    frontPhoto: paramFrontPhoto,
    backPhoto: paramBackPhoto,
    licenseCarId,
  } = route.params || {};

  const [licenseNumber, setLicenseNumber] = useState(paramLicenseNumber || "");
  const [licenseClass, setLicenseClass] = useState(paramLicenseClass || "");
  const [place, setPlace] = useState(paramPlace || "");
  const [nationality, setNationality] = useState(paramNationality || "");

  const parseDate = (str) => {
    if (!str) return new Date();
    const d = new Date(str);
    return isNaN(d) ? new Date() : d;
  };

  const [issueDate, setIssueDate] = useState(parseDate(paramIssueDate));
  const [expiryDate, setExpiryDate] = useState(parseDate(paramExpiryDate));
  const [showIssuePicker, setShowIssuePicker] = useState(false);
  const [showExpiryPicker, setShowExpiryPicker] = useState(false);

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
      const CreateAt = formatDate(new Date());
      const updatedData = {
        licenseNumber,
        licenseClass,
        place,
        nationality,
        issueDate: formatDate(issueDate),
        expiryDate: formatDate(expiryDate),
        frontPhoto: frontPhotoUrl,
        backPhoto: backPhotoUrl,
        CreateAt,
      };

      await updateLicenseData(licenseCarId, updatedData);
      Alert.alert("Thành công", "Cập nhật giấy phép thành công!");
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi cập nhật license:", error);
      Alert.alert("Lỗi", "Không thể cập nhật giấy phép.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Header value="Cập nhật bằng lái xe" />
      <Text className="text-sm font-semibold text-gray-600 mb-1">Số giấy phép</Text>
      <InputField
        placeholder="Số giấy phép"
        value={licenseNumber}
        onChangeText={setLicenseNumber}
        icon="card-account-details-outline"
      />

      <Text className="text-sm font-semibold text-gray-600 mt-3 mb-1">Hạng</Text>
      <InputField
        placeholder="Hạng"
        value={licenseClass}
        onChangeText={setLicenseClass}
        icon="format-list-bulleted-type"
      />

      <Text className="text-sm font-semibold text-gray-600 mt-3 mb-1">Nơi cấp</Text>
      <InputField
        placeholder="Nơi cấp"
        value={place}
        onChangeText={setPlace}
        icon="map-marker"
      />

      <Text className="text-sm font-semibold text-gray-600 mt-3 mb-1">Quốc tịch</Text>
      <InputField
        placeholder="Quốc tịch"
        value={nationality}
        onChangeText={setNationality}
        icon="flag"
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

      <DatePickerField
        label="Ngày hết hạn"
        date={expiryDate}
        onShowPicker={() => setShowExpiryPicker(true)}
        showPicker={showExpiryPicker}
        onChange={(event, selectedDate) => {
          setShowExpiryPicker(Platform.OS === "ios");
          if (selectedDate) setExpiryDate(selectedDate);
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

      <Button title="Cập nhật giấy phép" onPress={handleUpdate} loading={loading} />
    </ScrollView>
  );
};

export default UpdateLicenseDocument;
