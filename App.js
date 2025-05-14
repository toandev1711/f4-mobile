import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigations/MainStack";
import { SafeAreaView } from "react-native-safe-area-context";
import DriverStack from "./src/navigations/DriverStack";

export default function App() {
  return (
    <NavigationContainer>
      <View className="flex-1 font-roboto">

      <MainStack />
      {/* <DriverStack/> */}
      </View>
    </NavigationContainer>
  );
}
