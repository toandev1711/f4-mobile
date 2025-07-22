import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const ServiceCards = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Transport");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View className="bg-green-500" style={styles.card}>
          <View style={styles.cardContent}>
            <Image
              source={require("../../../assets/img/Locationicon.png")} // Thay bằng đường dẫn ảnh thực tế
              style={styles.itemImage}
            />
            <Text style={styles.itemText}>Đặt xe ngay</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  card: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
    height: "100%",
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemText: {
    color: "#444",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceCards;
