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

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
    // <NavigationContainer>
    //   <View className="flex-1 font-roboto">

    //   <MainStack />
    //   {/* <DriverStack/> */}
    //   </View>
    // </NavigationContainer>
  );
}
