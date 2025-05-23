import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ValidationMessage from "./ValidationMessage";
import { useRoute } from "@react-navigation/native";
import { createProfile } from "../../api/user/CreateUser";
import { useAuth } from "../../context/AuthContext";
import { loginAPI } from "../../api/auth/loginAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import RegisterHeader from "./RegisterHeader";
const RegisterFormScreen = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const isLengthValid = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === confirmPassword;
  const isEmpty = password.length === 0;
  const route = useRoute();
  const { phone } = route.params;
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    phone: "",
  });
  const { setUser, login } = useAuth();
  useEffect(() => {
    setFormData({ fullName, password, phone });
  }, [fullName, password]);
  const handleSubmit = async () => {
    try {
      if (!fullName.trim()) {
        setError("Vui lòng nhập tên đầy đủ.");
        return;
      }
      if (
        !isLengthValid ||
        !hasUpperCase ||
        !hasLowerCase ||
        !hasNumber ||
        !hasSpecialChar
      ) {
        setError(
          "Mật khẩu chưa đủ mạnh, vui lòng kiểm tra các yêu cầu bên dưới."
        );
        return;
      }
      if (!passwordsMatch) {
        setError("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
      }
      setError("");
      const res = await createProfile(formData);
      setTimeout(async () => {
        if (res) await login({ phone, password });
      }, 1000);
      Toast.show({
        type: "success",
        text1: "Đăng kí tài khoản thành công!",
      });
    } catch (error) {}
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-8">
      <RegisterHeader content="Thiết lập cho tài khoản của bạn" />

      <Text className="mb-2">Tên đầy đủ</Text>
      <TextInput
        placeholder="Nhập tên đầy đủ"
        value={fullName}
        onChangeText={setFullName}
        className="border border-gray-300 rounded-lg px-4 py-3.5 mb-4"
      />

      <Text className="mb-2">Mật khẩu</Text>
      <TextInput
        placeholder="Nhập mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 rounded-lg px-4 py-3.5 mb-2"
      />

      <ValidationMessage
        condition={isLengthValid}
        message="Ít nhất 8 ký tự"
        isEmpty={isEmpty}
      />
      <ValidationMessage
        condition={hasUpperCase}
        message="Có ít nhất 1 chữ hoa"
        isEmpty={isEmpty}
      />
      <ValidationMessage
        condition={hasLowerCase}
        message="Có ít nhất 1 chữ thường"
        isEmpty={isEmpty}
      />
      <ValidationMessage
        condition={hasNumber}
        message="Có ít nhất 1 số"
        isEmpty={isEmpty}
      />
      <ValidationMessage
        condition={hasSpecialChar}
        message="Có ít nhất 1 ký tự đặc biệt"
        isEmpty={isEmpty}
      />

      <Text className="mb-2 mt-4">Xác nhận mật khẩu</Text>
      <TextInput
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        className="border border-gray-300 rounded-lg px-4 py-3.5 mb-4"
      />

      {!passwordsMatch && confirmPassword.length > 0 && (
        <Text className="text-red-500 mb-4">
          Mật khẩu và xác nhận mật khẩu không khớp.
        </Text>
      )}

      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <TouchableOpacity
        onPress={handleSubmit}
        className="mt-6 bg-green-500 py-3 rounded-full"
      >
        <Text className="text-center text-base text-white font-semibold">Đăng ký</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterFormScreen;
