import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Suggestions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Có thể bạn sẽ thích</Text>
      <TouchableOpacity style={styles.suggestion} onPress={() => alert('Đi làm mỗi ngày')}>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/aedacca1535f440e8fa70e076b0dca73/e42062a513920bac2b21693ded7777cdf286908a?placeholderIfAbsent=true' }}
          style={styles.suggestionImage}
        />
        <View>
          <Text style={styles.suggestionTitle}>Đi làm mỗi ngày</Text>
          <Text style={styles.suggestionSubtitle}>Đặt xe nhanh, giá tốt cho lộ trình quen thuộc.</Text>
        </View>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/aedacca1535f440e8fa70e076b0dca73/2bc42f4dfcff7ba573dc7891003a3ed79e929e1c?placeholderIfAbsent=true' }}
          style={styles.arrow}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.suggestion} onPress={() => alert('Khám phá cuối tuần')}>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/aedacca1535f440e8fa70e076b0dca73/e42062a513920bac2b21693ded7777cdf286908a?placeholderIfAbsent=true' }}
          style={styles.suggestionImage}
        />
        <View>
          <Text style={styles.suggestionTitle}>Khám phá cuối tuần</Text>
          <Text style={styles.suggestionSubtitle}>Thuê xe tự lái hoặc có tài xế đi chơi xa.</Text>
        </View>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/aedacca1535f440e8fa70e076b0dca73/2bc42f4dfcff7ba573dc7891003a3ed79e929e1c?placeholderIfAbsent=true' }}
          style={styles.arrow}
        />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.suggestion} onPress={() => alert('Giao hàng hỏa tốc')}>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/aedacca1535f440e8fa70e076b0dca73/e42062a513920bac2b21693ded7777cdf286908a?placeholderIfAbsent=true' }}
          style={styles.suggestionImage}
        />
        <View>
          <Text style={styles.suggestionTitle}>Giao hàng hỏa tốc</Text>
          <Text style={styles.suggestionSubtitle}>Gửi tài liệu, bưu phẩm quan trọng siêu nhanh.</Text>
        </View>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/aedacca1535f440e8fa70e076b0dca73/2bc42f4dfcff7ba573dc7891003a3ed79e929e1c?placeholderIfAbsent=true' }}
          style={styles.arrow}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#F5F5F5' },
  title: { fontSize: 18, color: '#444', marginBottom: 10 },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  suggestionImage: { width: 64, height: 64, borderRadius: 8 },
  suggestionTitle: { fontSize: 14, color: '#444', marginLeft: 10 },
  suggestionSubtitle: { fontSize: 12, color: '#666', marginTop: 4, marginLeft: 10 },
  arrow: { width: 16, height: 16, marginLeft: 'auto' },
});

export default Suggestions;