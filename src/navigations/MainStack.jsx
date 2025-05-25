import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import StackRoutes from "../routes/StackRoute";
import LoginScreen from "../screens/UserLogin/LoginScreen";
import CustomerSignupScreen from "../screens/UserRegister/CustomerRegisterScreen";
import DriverRegistrationWizard from "../screens/UserRegister/DriverRegisterScreen";
import BottomTabDriver from "./BottomTabDriver";
import CCCDUploadScreen from "../screens/UserRegister/CCCDUploadScreen";
import LicenseInfoScreen from "../screens/UserRegister/LicenseInfoScreen";
import PersonalInfoScreen from "../screens/UserRegister/PersonalInfoScreen";
import VehicleInfoScreen from "../screens/UserRegister/VehicleInfoScreen";
const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerRegister"
        component={CustomerSignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DriverRegister"
        component={CCCDUploadScreen}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name="MainTabs"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      {StackRoutes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
      <Stack.Screen
        name="DriverTabs"
        component={BottomTabDriver}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}