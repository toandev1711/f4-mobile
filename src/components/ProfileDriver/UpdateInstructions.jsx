import React from "react";
import { View, Text, ScrollView } from "react-native";

const UpdateInstructions = () => (
  <ScrollView className="p-5">
    <Text className="text-xl font-bold text-gray-800 mb-3">Hướng dẫn cập nhật giấy tờ</Text>
    
    <Text className="text-gray-700 mb-4">
      Vui lòng làm theo các bước sau để cập nhật giấy tờ của bạn:
    </Text>

    <View className="space-y-4">
      <View>
        <Text className="text-base font-semibold text-purple-700 mb-1">1. Chuẩn bị giấy tờ</Text>
        <Text className="text-gray-600">
          Đảm bảo giấy tờ còn hạn sử dụng, rõ ràng và không bị mờ.
        </Text>
      </View>

      <View>
        <Text className="text-base font-semibold text-purple-700 mb-1">2. Chụp ảnh hoặc quét giấy tờ</Text>
        <Text className="text-gray-600">
          Sử dụng camera độ phân giải cao, chụp trong điều kiện ánh sáng tốt.
        </Text>
      </View>

      <View>
        <Text className="text-base font-semibold text-purple-700 mb-1">3. Tải lên hệ thống</Text>
        <Text className="text-gray-600">
          Nhấn nút “Tải lên” và chọn tệp ảnh đã chụp để gửi lên hệ thống.
        </Text>
      </View>
    </View>
  </ScrollView>
);

export default UpdateInstructions;
