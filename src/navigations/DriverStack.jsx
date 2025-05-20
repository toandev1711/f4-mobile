import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import BottomTab from "./BottomTab";
import StackRoutes from "../routes/StackRoute";
// import LoginScreen from "../screens/UserLogin/LoginScreen";
// import CustomerSignupScreen from "../screens/UserRegister/CustomerRegisterScreen";
// import DriverRegistrationWizard from "../screens/UserRegister/DriverRegisterScreen";
import BottomTabDriver from "./BottomTabDriver";

const Stack = createNativeStackNavigator();

export default function DriverStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DriverTabs"
        component={BottomTabDriver}
        options={{ headerShown: false }}
      />
      {StackRoutes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
}