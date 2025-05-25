import "./global.css";
import LoginScreen from "./src/screens/UserLogin/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneNumberInputScreen from "./src/screens/UserRegister/PhoneNumberInputScreen";
import OtpVerificationScreen from "./src/screens/UserRegister/OtpVerificationScreen";
import FullInfomation from "./src/screens/UserRegister/FullInformation";
const Stack = createNativeStackNavigator();

export default AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="CustomerRegister"
        component={PhoneNumberInputScreen}
      />
      <Stack.Screen name="otp" component={OtpVerificationScreen} />
      <Stack.Screen name="fullInfomation" component={FullInfomation} />
    </Stack.Navigator>
  );
};
