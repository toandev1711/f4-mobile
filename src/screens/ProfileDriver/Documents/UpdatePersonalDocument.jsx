import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { detectCccdFromImage } from "../../../api/DriverInfo/readImg";
import { updateImage } from "../../../api/DriverInfo/saveImg";
import { updatePersonalData } from "../../../api/DriverInfo/updateCccd";

import InputField from "../../../components/SignIUComponents/InputField";
import Button from "../../../components/SignIUComponents/Button";
import Header from "../../../components/Header/Header";
import DatePickerField from "../../../components/ProfileDriver/DatePickerField";
import ImagePickers from "../../../components/ProfileDriver/ImagePicker";

const UpdatePersonalDocument = ({ route }) => {
  const navigation = useNavigation();

  const {
    issueDate: paramIssueDate,
    createAt: paramCreateAt,
    frontPhoto: paramFrontPhoto,
    backPhoto: paramBackPhoto,
    id: paramIdentifierNumber,
  } = route.params || {};

  const [identifierNumber, setIdentifierNumber] = useState(paramIdentifierNumber || "");
  const [issueDate, setIssueDate] = useState(parseDate(paramIssueDate));
  const [createAt, setCreateAt] = useState(parseDate(paramCreateAt));

  const [frontImage, setFrontImage] = useState({ uri: paramFrontPhoto });
  const [backImage, setBackImage] = useState({ uri: paramBackPhoto });

  const [showIssuePicker, setShowIssuePicker] = useState(false);
  const [showCreateAtPicker, setShowCreateAtPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  function parseDate(str) {
    if (!str) return new Date();
    const d = new Date(str);
    return isNaN(d) ? new Date() : d;
  }

  const formatDate = (date) => {
    const d = date instanceof Date ? date : new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const parseDateFromString = (str) => {
    if (!str) return new Date();
    if (str.includes("/")) {
      const parts = str.split("/");
      if (parts.length === 3) {
        return new Date(+parts[2], parts[1] - 1, +parts[0]);
      }
    } else if (str.includes("-")) {
      return new Date(str);
    }
    if (str.length === 8) {
      const day = parseInt(str.substring(0, 2));
      const month = parseInt(str.substring(2, 4)) - 1;
      const year = parseInt(str.substring(4, 8));
      return new Date(year, month, day);
    }
    return new Date();
  };
  const handleDetectFromImage = async (image) => {
  try {
    if (!image?.uri) {
      Alert.alert("Lỗi", "Không có ảnh để nhận dạng.");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      name: "license.jpg",
      type: "image/jpeg",
    });

    const response = await detectCccdFromImage(formData);

    console.log("Kết quả nhận dạng ảnh:", response);

    const result = response.result || {};
    const idNumber = result["Mã số CCCD"];
    const rawIssueDate = result["Ngày cấp"];

    if (idNumber) {
      setIdentifierNumber(idNumber);
    }

    if (rawIssueDate) {
      const cleanDate = rawIssueDate.split(" ")[0]; 
      setIssueDate(parseDateFromString(cleanDate));
    } else {
      Alert.alert("Thông báo", "Không trích xuất được ngày cấp.");
    }

  } catch (error) {
    console.error("Lỗi nhận dạng ảnh:", error);
    Alert.alert("Lỗi", "Không thể trích xuất dữ liệu từ ảnh.");
  }
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

      const createAtNow = formatDate(new Date());

      const updatedData = {
        identifierNumber,
        issueDate: formatDate(issueDate),
        createAt: createAtNow,
        frontPhoto: frontPhotoUrl,
        backPhoto: backPhotoUrl,
      };

      await updatePersonalData(updatedData);

      Alert.alert("Thành công", "Cập nhật giấy phép thành công!");
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi cập nhật giấy phép:", error);
      Alert.alert("Lỗi", "Không thể cập nhật giấy phép.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Header value="Cập nhật giấy tờ cá nhân" />

      <Text className="text-sm font-semibold text-gray-600 mb-1">Số giấy phép</Text>
      <InputField
        placeholder="Số giấy phép"
        value={identifierNumber}
        onChangeText={setIdentifierNumber}
        icon="card-account-details-outline"
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
        label="Ngày tạo"
        date={createAt}
      />

      <ImagePickers
        image={frontImage}
        onImageChange={setFrontImage}
        label="Ảnh mặt trước"
        onAfterPick={handleDetectFromImage}
      />

      <ImagePickers
        image={backImage}
        onImageChange={setBackImage}
        label="Ảnh mặt sau"
      />

      <Button title="Cập nhật giấy tờ" onPress={handleUpdate} loading={loading} />
    </ScrollView>
  );
};

export default UpdatePersonalDocument;
