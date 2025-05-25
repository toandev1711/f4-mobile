import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "./src/context/AppProvider";
import RootApp from "./RootApp";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RootApp />
      </AppProvider>
    </SafeAreaProvider>
  );
}
