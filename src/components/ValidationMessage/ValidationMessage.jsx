import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ValidationMessage = ({ condition, message }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Icon 
        name="check-circle" 
        size={20} 
        color={condition ? 'green' : 'gray'} 
      />
      <Text style={{ color: condition ? 'green' : 'gray', marginLeft: 8 }}>
        {message}
      </Text>
    </View>
  );
};

export default ValidationMessage;
