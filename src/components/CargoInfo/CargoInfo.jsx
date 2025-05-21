import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  useWindowDimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const CargoInfo = ({ cargoData, onUpdate }) => {
  const { width } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(240);
  const [errors, setErrors] = useState({}); // Trạng thái lỗi

  // Hàm chọn ảnh
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Yêu cầu quyền', 'Cần cấp quyền truy cập thư viện hình ảnh!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      onUpdate('image', uri);

      Image.getSize(
        uri,
        (imgWidth, imgHeight) => {
          const ratio = imgHeight / imgWidth;
          const containerWidth = width - 40;
          setImageHeight(containerWidth * ratio);
        },
        () => {
          setImageHeight(240);
        }
      );
    }
  };

// ở phần validateField
const validateField = (field, value) => {
  let errorMsg = '';
  if (field === 'name') {
    if (!value || value.trim() === '') {
      errorMsg = 'Vui lòng nhập tên hàng hóa';
    }
  } else if (field === 'weight') {
    if (!value || isNaN(Number(value))) {
      errorMsg = 'Vui lòng nhập trọng lượng hợp lệ';
    } else if (Number(value) <= 0) {
      errorMsg = 'Trọng lượng phải lớn hơn 0';
    }
  } else if (field === 'dimensions') {
    if (!value || value.trim() === '') {
      errorMsg = 'Vui lòng nhập kích thước';
    } else {
      const parts = value.split('x').map(p => p.trim());
      if (parts.length !== 3) {
        errorMsg = 'Kích thước phải có dạng D x R x C';
      } else {
        const [d, r, c] = parts;
        if (
          isNaN(Number(d)) || Number(d) <= 0 ||
          isNaN(Number(r)) || Number(r) <= 0 ||
          isNaN(Number(c)) || Number(c) <= 0
        ) {
          errorMsg = 'Các kích thước phải là số lớn hơn 0';
        }
      }
    }
  }
  return errorMsg;
};

  // Hàm xử lý thay đổi và validate
  const handleChangeText = (field, value) => {
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    onUpdate(field, value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stylesInfo}>Thông tin hàng hóa</Text>

      {/* Tên hàng hóa */}
      <Text style={styles.label}>Tên hàng hóa:</Text>
      <TextInput
        style={styles.input}
        value={cargoData.name}
        placeholder="Nhập tên hàng hóa"
        onChangeText={(text) => handleChangeText('name', text)}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      {/* Trọng lượng */}
      <Text style={styles.label}>Trọng lượng (kg):</Text>
      <TextInput
        style={styles.input}
        value={cargoData.weight}
        keyboardType="numeric"
        placeholder="VD: 10"
        onChangeText={(text) => handleChangeText('weight', text)}
      />
      {errors.weight ? <Text style={styles.errorText}>{errors.weight}</Text> : null}

      {/* Kích thước */}
      <Text style={styles.label}>Kích thước (D x R x C):</Text>
      <TextInput
        style={styles.input}
        value={cargoData.dimensions}
        placeholder="VD: 30 x 20 x 15"
        onChangeText={(text) => handleChangeText('dimensions', text)}
      />
      {errors.dimensions ? <Text style={styles.errorText}>{errors.dimensions}</Text> : null}

      {/* Ảnh */}
      <Text style={styles.label}>Hình ảnh:</Text>
      {cargoData.image ? (
        <Image
          source={{ uri: cargoData.image }}
          style={[styles.imagePreview, { height: imageHeight }]}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.noImage}>Chưa có hình ảnh</Text>
      )}

      {/* Button chọn ảnh */}
      <Pressable style={styles.imageButton} onPress={handlePickImage}>
        <Ionicons name="image-outline" size={20} color="white" />
        <Text style={styles.imageButtonText}>Chọn ảnh</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
  stylesInfo: {
    padding: 5,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  imagePreview: {
    width: '100%',
    marginTop: 10,
    borderRadius: 8,
  },
  noImage: {
    fontStyle: 'italic',
    color: '#888',
    marginTop: 8,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00b14f',
    padding: 10,
    borderRadius: 6,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  imageButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default CargoInfo;