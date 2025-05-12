// components/ClickMeButton.tsx
import { Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

export default function Button() {
  const handlePress = () => {
    Alert.alert("You clicked the button!");
  };

  return (
    <TouchableOpacity
      className="bg-blue-500 px-4 py-2 rounded-xl mt-2"
      onPress={handlePress}
    >
      <Text className="text-white text-center font-semibold">Click Me</Text>
    </TouchableOpacity>
  );
}
