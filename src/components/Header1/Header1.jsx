import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Sử dụng thư viện icon, cài đặt nếu cần: expo install @expo/vector-icons

const Header1 = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <View style={styles.userInfo}>
          <Ionicons name="person-circle-outline" size={32} color="#C9A7E5" style={styles.avatar} />
          <View>
            <Text style={styles.welcomeText}>Chào mừng trở lại,</Text>
            <Text style={styles.userName}>Người dùng</Text>
          </View>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => alert('Tin nhắn')}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchButton}>
        <Ionicons name="search" size={16} color="white" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm địa điểm"
          placeholderTextColor="white"
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
    backgroundColor: '#5b21b6', // darkPurple
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  welcomeText: { color: '#C9A7E5', fontSize: 12 },
  userName: { color: 'white', fontSize: 16, marginTop: 4 },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A020F0',
  },
  searchInput: { 
    color: 'white', 
    fontSize: 16,
    flex: 1,
    padding: 0,
  },
});

export default Header1;