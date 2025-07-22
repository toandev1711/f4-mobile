import { AuthProvider } from "./AuthContext";
import { ColorProvider } from "./ColorContext";
import { LocationProvider } from "./LocationContext";
export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <LocationProvider>
        <ColorProvider>{children}</ColorProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
