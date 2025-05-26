// src/components/Promotions.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Promotions = () => {
  const promotions = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/aedacca1535f440e8fa70e076b0dca73/171c7bebc31dd6915ce3cdabf464d259789a2578?placeholderIfAbsent=true",
      title: "Giảm 20% chuyến đầu",
      subtitle: "Áp dụng cho người dùng mới. Đặt ngay!",
      color: "#5A2E8D", // Màu tím đậm
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/aedacca1535f440e8fa70e076b0dca73/171c7bebc31dd6915ce3cdabf464d259789a2578?placeholderIfAbsent=true",
      title: "Miễn phí giao hàng",
      subtitle: "Cho đơn hàng từ 100k. Khám phá ngay!",
      color: "#28a745", // Màu xanh lá đậm
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/aedacca1535f440e8fa70e076b0dca73/171c7bebc31dd6915ce3cdabf464d259789a2578?placeholderIfAbsent=true",
      title: "Tích điểm đổi quà",
      subtitle: "Mỗi chuyến đi, thêm điểm thưởng.",
      color: "#FFA500", // Màu cam
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ưu đãi nổi bật</Text>
        <TouchableOpacity onPress={() => alert('Xem tất cả')}>
          <Text style={styles.viewAll}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      {/* Render danh sách các card */}
      {promotions.map((promo, index) => (
        <PromotionCard
          key={index}
          image={promo.image}
          title={promo.title}
          subtitle={promo.subtitle}
          color={promo.color}
        />
      ))}
    </View>
  );
};

const PromotionCard = ({ image, title, subtitle, color }) => (
  <View style={[styles.card, { backgroundColor: color }]}>
    <Image source={{ uri: image }} style={styles.cardImage} />
    <View style={styles.overlay} />
    <View style={styles.textContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#444',
    marginLeft: 10,
  },
  viewAll: {
    color: '#4B0082',
    fontSize: 14,
    marginRight: 10,
  },
  card: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    // backgroundColor sẽ được truyền qua props
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 120,
    aspectRatio: 3.196,
  },
  overlay: {
    position: 'absolute',
    height: 80,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 14,
  },
  cardSubtitle: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Promotions;
