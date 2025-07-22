import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Sử dụng thư viện icon, cài đặt nếu cần: expo install @expo/vector-icons
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const Header1 = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View className="bg-green-500 py-5 px-2">
      <View style={styles.topRow} className="bg-green-500">
        <View style={styles.userInfo}>
          <Ionicons
            name="person-circle-outline"
            size={32}
            color="#FFFFFF"
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcomeText}>Chào mừng trở lại,</Text>
            <Text style={styles.userName}>với F4</Text>
          </View>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => alert("Tin nhắn")}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#5cbaa2"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchButton}>
        <Ionicons name="search" size={16} color="#5cbaa2" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm địa điểm"
          placeholderTextColor="#5cbaa2"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  welcomeText: { color: "#FFFFFF", fontSize: 12 },
  userName: { color: "white", fontSize: 16, marginTop: 4 },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#5cbaa2",
  },
  searchInput: {
    color: "#5cbaa2",
    fontSize: 16,
    flex: 1,
    padding: 0,
  },
});

export default Header1;
