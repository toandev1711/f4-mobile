import "./global.css";
import LoginScreen from "./src/screens/UserLogin/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneNumberInputScreen from "./src/screens/UserRegister/PhoneNumberInputScreen";
import OtpVerificationScreen from "./src/screens/UserRegister/OtpVerificationScreen";
import FullInfomation from "./src/screens/UserRegister/FullInformation";
import CCCDUploadScreen from "./src/screens/UserRegister/CCCDUploadScreen";
import LicenseInfoScreen from "./src/screens/UserRegister/LicenseInfoScreen";
import PersonalInfoScreen from "./src/screens/UserRegister/PersonalInfoScreen";
import VehicleInfoScreen from "./src/screens/UserRegister/VehicleInfoScreen";
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
      {/* test */}
      <Stack.Screen name="DriverRegister" component={CCCDUploadScreen} />
      <Stack.Screen
        name="LicenseInformation"
        component={LicenseInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VehicleInformation"
        component={VehicleInfoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
