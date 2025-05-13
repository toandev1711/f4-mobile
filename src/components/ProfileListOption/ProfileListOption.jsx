import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons từ react-native-vector-icons
import tailwind from './tailwind'; // Import tailwind

const ProfileListOption = ({ icon, content, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tailwind('flex-row justify-between p-4 bg-white rounded-lg my-2 items-center max-w-sm')}
    >
      <View style={tailwind('flex-row items-center')}>
        <Ionicons name={icon} size={20} />
        <Text style={tailwind('ml-3 text-base font-medium')}>{content}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} />
    </TouchableOpacity>
  );
};

export default ProfileListOption;
