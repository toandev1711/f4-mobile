import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/SignIUComponents/Header";
import Footer from "../../components/SignIUComponents/Footer";
import AuthLinks from "../../components/SignIUComponents/AuthLinks";
import FormWrapper from "../../components/SignIUComponents/FormWrapper";
import PhoneInput from "../../components/SignIUComponents/PhoneInput";
import InputField from "../../components/SignIUComponents/InputField";
import Button from "../../components/SignIUComponents/Button";
import { login } from "../../api/auth/loginAPI";
import { jwtDecode } from "jwt-decode";

const handleLogin = async () => {
  try {
    const data = await login({
      phone: "0123456789",
      password: "mypassword",
    });
    console.log("Đăng nhập thành công:", data);
  } catch (error) {
    console.error("Đăng nhập thất bại:", error.message);
  }
};

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();

  const phone = watch("phone");
  const password = watch("password");

  useEffect(() => {
    if (formData.phone !== phone || formData.password !== password) {
      setFormData({
        phone: phone || "",
        password: password || "",
      });
    }
  }, [phone, password]);

  function hasRoleUser(scopeString) {
    if (typeof scopeString !== "string") return false;

    const roles = scopeString.trim().split(/\s+/); // tách bằng khoảng trắng
    return roles.includes("ROLE_USER");
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await login(data);
      const token = response.result.jwt;
      const decoded = jwtDecode(token);
      const isUser = hasRoleUser(decoded.scope);
      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công!",
      });

      setTimeout(() => {
        setIsSubmitting(false);
        if (isUser) {
          navigation.navigate("MainTabs");
        } else{
          navigation.navigate("DriverTabs");
        }
      }, 1000);
    } catch (error) {
      const errorMessage = "Đăng nhập thất bại";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.main}>
            <View style={styles.formContainer}>
              <Header welcomeText="CHÀO MỪNG BẠN TRỞ LẠI VỚI" />
              <FormWrapper>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        setFormData({ ...formData, phone: text });
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      type="password"
                      placeholder="Mật khẩu"
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        setFormData({ ...formData, password: text });
                      }}
                      error={errors.password?.message}
                      secureTextEntry
                    />
                  )}
                />
                <Button
                  title="Đăng Nhập"
                  onPress={handleSubmit(onSubmit)}
                  loading={isSubmitting}
                />
              </FormWrapper>
              <AuthLinks
                showGoogle={true}
                linkText="Bạn chưa có tài khoản?"
                linkPress={() => navigation.navigate("CustomerRegister")}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer />
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: width * 0.9,
    maxWidth: 400,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
