import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabRoutes from "../routes/TabRoute";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowColor: "transparent",
          height: 52,
          marginBottom: 12,
        },
        tabBarActiveTintColor: "#02b34f",
      }}
    >
      {TabRoutes.map((route, index) => (
        <Tab.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTab;
