import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { CameraIcon } from "react-native-heroicons/outline";

const ImagePickers = ({ image, onImageChange, label, onAfterPick }) => {
  const [tempImage, setTempImage] = useState(image);

  useEffect(() => {
    setTempImage(image);
  }, [image]);

  const processImage = async (asset) => {
    let localUri = asset.uri;

    if (Platform.OS === "ios" && asset.assetId) {
      const fileAsset = await MediaLibrary.getAssetInfoAsync(asset.assetId);
      if (fileAsset?.localUri) {
        localUri = fileAsset.localUri;
      }
    }

    const picked = { uri: localUri, file: { ...asset, uri: localUri } };
    setTempImage(picked);
    onImageChange(picked);
    if (onAfterPick) onAfterPick(picked);
  };

  const pickImage = () => {
    Alert.alert("Chọn ảnh", "Bạn muốn chọn ảnh từ đâu?", [
      {
        text: "Thư viện",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
          });
          if (!result.canceled) {
            await processImage(result.assets[0]);
          }
        },
      },
      {
        text: "Chụp ảnh",
        onPress: async () => {
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (permission.status !== "granted") {
            Alert.alert("Thông báo", "Bạn cần cấp quyền truy cập camera.");
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
          });
          if (!result.canceled) {
            await processImage(result.assets[0]);
          }
        },
      },
      { text: "Huỷ", style: "cancel" },
    ]);
  };

  // Hàm hủy chọn ảnh mới, trả về ảnh gốc ban đầu
  const cancelImage = () => {
    setTempImage(image); // reset ảnh hiển thị về ảnh gốc
    onImageChange(image); // thông báo ảnh thay đổi về ảnh gốc
    if (onAfterPick) onAfterPick(image);
  };

  // Xác định ảnh hiện tại có phải là ảnh mới hay không
  const isNewImage =
    tempImage?.uri !== image?.uri;

  return (
    <View className="mb-4">
      {label && <Text className="text-lg font-semibold mb-2">{label}</Text>}
      <Image
        source={{ uri: tempImage?.uri }}
        style={{ width: "100%", height: 200, borderRadius: 8 }}
      />

      <View className="flex-row space-x-3 mt-2">
        <TouchableOpacity
          onPress={pickImage}
          className="bg-blue-600 rounded-md px-3 py-1 flex-row items-center justify-center"
        >
          <CameraIcon size={16} color="white" />
          <Text className="text-white font-medium ml-1 text-sm">Chọn ảnh</Text>
        </TouchableOpacity>

        {isNewImage && (
          <TouchableOpacity
            onPress={cancelImage}
            className="bg-gray-400 rounded-md px-3 py-1 flex-row items-center justify-center"
          >
            <Text className="text-white font-medium text-sm">Hủy</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ImagePickers;
