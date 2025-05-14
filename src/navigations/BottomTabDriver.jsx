import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabRoutesDriver from "../routes/TabRouteDriver";

const Tab = createBottomTabNavigator();

const BottomTabDriver = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowColor: "transparent",
          height: 52
        },
      }}
    >
      {TabRoutesDriver.map((route, index) => (
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

export default BottomTabDriver;
