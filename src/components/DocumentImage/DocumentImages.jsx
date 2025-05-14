import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { PhotoIcon } from "react-native-heroicons/outline";

const DocumentImages = ({ imageUrls }) => {
  const renderItem = ({ item, index }) => (
    <View key={index} className="w-full mb-4">
      <Image
        source={{
          uri: item || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
        }}
        resizeMode="cover"
        className="w-full h-48 rounded-md shadow"
      />
    </View>
  );

  return (
    <View className="mb-6">
      {imageUrls && imageUrls.length > 0 ? (
        <FlatList
          data={imageUrls}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          numColumns={1} // Bạn có thể chỉnh thành 2 hoặc 3 nếu cần dạng lưới
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      ) : (
        <View className="items-center justify-center mt-6">
          <PhotoIcon size={40} color="#9CA3AF" /> {/* text-gray-400 */}
          <Text className="text-gray-500 mt-2">Không có ảnh giấy tờ nào.</Text>
        </View>
      )}
    </View>
  );
};

export default DocumentImages;
