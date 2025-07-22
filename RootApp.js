import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigations/MainStack";
import { useColor } from "./src/context/ColorContext";
import { useAuth } from "./src/context/AuthContext";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import AuthStack from "./AuthStack";
import { SocketProvider } from "./src/context/SocketContext";

export default RootApp = () => {
  const [fontLoaded] = useFonts({
    "facebook-sans": require("./assets/fonts/FacebookSansRegular.ttf"),
    "facebook-sans-bold": require("./assets/fonts/FacebookSansBold.ttf"),
  });
  const { user, isLoading } = useAuth();
  const { statusBarColor } = useColor();
  useEffect(() => {
    if (fontLoaded) {
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = { fontFamily: "facebook-sans" };
    }
  }, [fontLoaded]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: statusBarColor }}>
      <NavigationContainer>
        <SocketProvider userId={user?.id}>
          {user ? <MainStack /> : <AuthStack />}
          {/* <MainStack /> */}
        </SocketProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};
