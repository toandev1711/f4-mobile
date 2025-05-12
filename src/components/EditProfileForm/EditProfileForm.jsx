import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidationMessage from '../ValidationMessage/ValidationMessage'; 
import Header from '../Header/Header'; 

const EditProfileForm = () => {
  const specialChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ@#$%^&*(!)]/;
  const route = useRoute();
  const navigation = useNavigation();
  const { label, type, value, note } = route.params || {};
  const [oldPassword, setOldPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fieldValue, setFieldValue] = useState(type === 'password' ? '' : value);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('edit');
  const [tries, setTries] = useState(0);
  const correctOtp = '123456';
  const checkLength = fieldValue.length >= 8;
  const hasUpperCase = /[A-Z]/.test(fieldValue);
  const hasSpecialChar = specialChars.test(fieldValue);

  if (!label || !type) {
    return (
      <View className="p-4">
        <Text>Missing data. Please go back and select a field to edit.</Text>
      </View>
    );
  }

  const handleSaveInformation = () => {
    console.log('Saving information...');
    if (label === 'Phone Number') {
      const isValid = /^0\d{9}$/.test(fieldValue);
      if (!isValid) {
        Toast.show({ type: 'error', text1: 'Số điện thoại không hợp lệ', position: 'bottom', bottomOffset: 20 });
        return;
      }
      Toast.show({ type: 'success', text1: `OTP đã gửi đến ${fieldValue}` , position: 'bottom', bottomOffset: 20 });
      setStep('otp');
    } else {
      navigation.goBack();
    }
  };

  const handleOtpSubmit = () => {
    if (otp === correctOtp) {
      Toast.show({ type: 'success', text1: 'Xác thực thành công!' , position: 'bottom', bottomOffset: 20 });
      navigation.goBack();
    } else {
      const newTries = tries + 1;
      setTries(newTries);
      if (newTries >= 3) {
        Toast.show({ type: 'error', text1: 'Sai quá 3 lần. Nhập lại số ĐT.', position: 'bottom', bottomOffset: 20  });
        setStep('edit');
        setOtp('');
        setFieldValue('');
        setTries(0);
      } else {
        Toast.show({ type: 'error', text1: `Mã OTP sai. Còn ${3 - newTries} lần thử.` , position: 'bottom', bottomOffset: 20 });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 p-4"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Toast />
      {step === 'edit' && (
        <>
          <Header value={label} tail="Done" onClick={handleSaveInformation} />
          <View className="mt-10">
            {type === 'password' && (
              <View className="mb-6">
                <Text className="text-sm text-gray-500 mb-1">Nhập mật khẩu cũ</Text>
                <TextInput
                  secureTextEntry
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  placeholder="Nhập mật khẩu cũ"
                  className="border border-gray-300 rounded-lg px-4 py-3.5"
                />
              </View>
            )}

            <Text className="text-sm text-gray-500 mb-1">Nhập {label}</Text>
            <View className="relative">
              <TextInput
                value={fieldValue}
                onChangeText={setFieldValue}
                placeholder={`Nhập ${label}`}
                secureTextEntry={type === 'password' && !isPasswordVisible}
                className="border border-gray-300 rounded-lg px-4 py-3.5 pr-12"
              />
              {type === 'password' && (
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-3.5"
                >
                  <Icon
                    name={isPasswordVisible ? 'eye' : 'eye-slash'}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text className="text-xs text-gray-500 mt-4">{note}</Text>
            {type === 'password' && (
              <View className="mt-3 space-y-1">
                <ValidationMessage condition={checkLength} message="Nhập đủ 8 kí tự" />
                <ValidationMessage condition={hasUpperCase} message="Bao gồm chữ hoa" />
                <ValidationMessage condition={hasSpecialChar} message="Bao gồm kí tự đặc biệt" />
              </View>
            )}
          </View>
        </>
      )}

      {step === 'otp' && (
        <View className="mt-10">
          <Text className="text-xl font-semibold mb-4">Nhập mã OTP</Text>
          <TextInput
            value={otp}
            onChangeText={setOtp}
            placeholder="Nhập mã OTP"
            keyboardType="numeric"
            className="border border-gray-300 rounded-lg px-4 py-3.5 mb-4"
          />
          <TouchableOpacity
            onPress={handleOtpSubmit}
            className="bg-green-500 py-3 rounded"
          >
            <Text className="text-white text-center">Xác nhận</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default EditProfileForm;
