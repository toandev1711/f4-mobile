import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
const DatePickerField = ({ label, date, onShowPicker, showPicker, onChange }) => {
  // Hiển thị ngày theo định dạng hoặc placeholder
  const displayDate = date ? formatDate(date) : "Chọn ngày";

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ marginBottom: 4, fontWeight: '600', color: '#4B5563' }}>{label}</Text>
      <TouchableOpacity
        onPress={onShowPicker}
        style={{
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 8,
          backgroundColor: '#fff',
          height: 44,
          justifyContent: 'center',
          paddingHorizontal: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 16, color: date ? '#111827' : '#9CA3AF', flex: 1 }}>
          {displayDate}
        </Text>
        <CalendarDaysIcon color="#6B46C1" size={20} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

export default DatePickerField;