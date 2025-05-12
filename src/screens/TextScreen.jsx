import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import TestComponent from '../components/TestComponent';
import Button from '../components/Button';

export default function TestScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-blue-400 text-center mb-4">This is F4 HomeScreen</Text>
      <TestComponent />
      <Button />
    </SafeAreaView>
  );
}