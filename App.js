import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigations/MainStack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DriverStack from "./src/navigations/DriverStack";
import TransportScreen from "./src/screens/Transport/TransportScreen";
import SearchLocationScreen from "./src/screens/SearchLocation/SearchLocationScreen";
import CurrentLocation from "./src/components/CurrentLocation/CurrentLocation";
import MapDisplay from "./src/screens/MapDisplay/MapDisplay";
import FormToggle from "./FormToggle";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/UserLogin/LoginScreen";
import { ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerSignupScreen from './src/screens/UserRegister/CustomerRegisterScreen'
import PhoneNumberInputScreen from "./src/screens/UserRegister/PhoneNumberInputScreen";
import OtpVerificationScreen from "./src/screens/UserRegister/OtpVerificationScreen";
import FullInfomation from "./src/screens/UserRegister/FullInformation";
const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CustomerRegister" component={PhoneNumberInputScreen} />
      <Stack.Screen name="otp" component={OtpVerificationScreen} />
      <Stack.Screen name="fullInfomation" component={FullInfomation} />
    </Stack.Navigator>
  );
}
const RootApp = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return user ? <MainStack /> : <AuthStack />
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">   
        <AuthProvider>
          <NavigationContainer>
            <RootApp />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}