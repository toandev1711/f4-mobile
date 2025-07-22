import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/SignIUComponents/InputField";
import Button from "../../components/SignIUComponents/Button";
import { useAuth } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../../components/SignIUComponents/Footer";
import AuthLinks from "../../components/SignIUComponents/AuthLinks";
const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const { login } = useAuth();
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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data);
      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công!",
      });
      setIsSubmitting(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
      });
      setIsSubmitting(false);
    }
  };

  const handleForgetPassword = () => {
    // navigation.navigate("ForgetPassword");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#4dbccf", "#5cbaa2"]} style={styles.container}>
        <LinearGradient
          colors={["#4dbccf", "#5cbaa2"]}
          style={styles.headerContainer}
        >
          <Image
            source={require("../../../assets/img/Pngtreebig.png")}
            style={styles.plantImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Welcome to F4Delivery</Text>
          </View>
        </LinearGradient>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.formContainer}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.loginText}>Login to your account</Text>
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "Nhập số điện thoại để đăng nhập",
                pattern: {
                  value: /^((\+84)|0)[3|5|7|8|9][0-9]{8}$/,
                  message: "phone không hợp lệ",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  type="phone"
                  name="phone"
                  label="Số điện thoại"
                  placeholder="phone"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    setFormData({ ...formData, phone: text });
                  }}
                  error={errors.phone?.message}
                  keyboardType="phone-address"
                  style={styles.inputField}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Mật khẩu là bắt buộc",
              }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  type="password"
                  label="Mật khẩu"
                  placeholder="Mật khẩu"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    setFormData({ ...formData, password: text });
                  }}
                  error={errors.password?.message}
                  secureTextEntry
                  style={styles.inputField}
                />
              )}
            />
            <View style={styles.optionsRow}>
              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.rememberMeContainer}>
                    <TouchableOpacity
                      onPress={() => onChange(!value)}
                      style={styles.checkbox}
                    >
                      {value && <View style={styles.checkboxInner} />}
                    </TouchableOpacity>
                    <Text style={styles.rememberMeText}>Lưu đăng nhập</Text>
                  </View>
                )}
              />
              <TouchableOpacity onPress={handleForgetPassword}>
                <Text style={styles.forgetPasswordText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="ĐĂNG NHẬP"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
            />
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>hoặc đăng nhập với</Text>
              <View style={styles.dividerLine} />
            </View>
            <AuthLinks
              showGoogle={true}
              linkText="Bạn chưa có tài khoản? Đăng Ký"
              linkPress={() => navigation.navigate("CustomerRegister")}
            />
            <Footer />
          </ScrollView>
        </KeyboardAvoidingView>
        <Toast />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: height * 0.35,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    zIndex: 1,
    fontFamily: "Roboto-Bold",
  },
  plantImage: {
    width: 180,
    height: 180,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -20,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "center",
  },
  loginText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2E7D7A",
    marginBottom: 16,
    textAlign: "center",
  },
  inputField: {
    marginBottom: 16,
  },
  forgetPasswordText: {
    color: "#2E7D7A",
    fontSize: 14,
    textAlign: "right",
    paddingVertical: 2,
  },
  loginButton: {
    backgroundColor: "#2E7D7A",
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2E7D7A",
  },
  dividerText: {
    color: "#2E7D7A",
    fontSize: 14,
    marginHorizontal: 8,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#2E7D7A",
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D7A",
  },
  signUpText: {
    color: "#2E7D7A",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    width: "100%",
    marginTop: 0,
    marginBottom: 10,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#2E7D7A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#2E7D7A",
  },
  rememberMeText: {
    color: "#2E7D7A",
    fontSize: 14,
  },
});

export default LoginScreen;
