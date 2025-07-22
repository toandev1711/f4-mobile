import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Modal,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Linking } from "react-native";

const { width } = Dimensions.get("window");

const ImagePickerComponent = ({
  imageUri,
  onImageChange,
  label,
  isLoading,
  guideText,
  onLoadingChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const requestStoragePermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Quyền truy cập bị từ chối",
        "Vui lòng cấp quyền truy cập ảnh trong Cài đặt > Ứng dụng > [Tên app] > Quyền > Ảnh và video.",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Mở Cài đặt", onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
    return true;
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Quyền truy cập bị từ chối",
        "Vui lòng cấp quyền truy cập camera trong Cài đặt > Ứng dụng > [Tên app] > Quyền > Camera.",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Mở Cài đặt", onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
    return true;
  };

  const pickImage = async (sourceType) => {
    let hasPermission = false;
    if (sourceType === "camera") {
      hasPermission = await requestCameraPermission();
    } else {
      hasPermission = await requestStoragePermission();
    }
    if (!hasPermission) {
      Toast.show({
        type: "error",
        text1: `Cần cấp quyền truy cập ${
          sourceType === "camera" ? "camera" : "thư viện ảnh"
        }!`,
      });
      return;
    }

    onLoadingChange(true);
    try {
      const result =
        sourceType === "camera"
          ? await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0.8,
              allowsEditing: true,
              aspect: [4, 3],
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0.8,
              allowsEditing: true,
              aspect: [4, 3],
            });

      if (result.canceled) {
        Toast.show({ type: "info", text1: "Đã hủy chọn ảnh" });
      } else if (result.assets && result.assets[0].uri) {
        onImageChange(result.assets[0].uri);
        Toast.show({ type: "success", text1: "Tải ảnh thành công!" });
      } else {
        Toast.show({ type: "error", text1: "Không chọn được ảnh!" });
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Lỗi khi chọn ảnh!" });
      console.error("Image picking error:", error);
    } finally {
      onLoadingChange(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [imageUri]);

  return (
    <View style={styles.imagePickerContainer}>
      <TouchableOpacity
        style={[styles.imagePicker, imageUri && styles.imagePickerWithImage]}
        onPress={() => setShowModal(true)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#6B46C1" />
        ) : (
          <View style={styles.imagePickerContent}>
            <Icon name="camera-plus" size={24} color="#6B46C1" />
            <Text style={styles.imagePickerText}>
              {imageUri ? `Thay ${label}` : `Tải lên ${label}`}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      {imageUri && (
        <Animated.View
          style={[styles.imagePreviewContainer, { opacity: fadeAnim }]}
        >
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={() => onImageChange(null)}
          >
            <Icon name="close-circle" size={24} color="#EF4444" />
          </TouchableOpacity>
        </Animated.View>
      )}
      <Text style={styles.imageGuideText}>{guideText}</Text>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
            <Text style={styles.modalTitle}>Chọn nguồn ảnh</Text>
            <Text style={styles.modalSubtitle}>
              Đảm bảo ảnh rõ nét, đầy đủ thông tin, không bị che khuất
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => pickImage("camera")}
            >
              <View style={styles.modalButtonContent}>
                <Icon
                  name="camera"
                  size={20}
                  color="#FFFFFF"
                  style={styles.modalButtonIcon}
                />
                <Text style={styles.modalButtonText}>Chụp ảnh</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => pickImage("library")}
            >
              <View style={styles.modalButtonContent}>
                <Icon
                  name="image"
                  size={20}
                  color="#FFFFFF"
                  style={styles.modalButtonIcon}
                />
                <Text style={styles.modalButtonText}>Chọn từ thư viện</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalCancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePickerContainer: {
    marginBottom: 16,
  },
  imagePicker: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePickerWithImage: {
    backgroundColor: "#F3E8FF",
  },
  imagePickerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePickerText: {
    color: "#6B46C1",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  imagePreviewContainer: {
    position: "relative",
    marginTop: 12,
  },
  imagePreview: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 4,
  },
  imageGuideText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: width * 0.85,
    maxWidth: 340,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1F2937",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#6B46C1",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  modalButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonIcon: {
    marginRight: 8,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  modalCancelButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 12,
    padding: 14,
    width: "100%",
    alignItems: "center",
  },
  modalCancelButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ImagePickerComponent;
