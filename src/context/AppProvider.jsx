import { AuthProvider } from "./AuthContext";
import { ColorProvider } from "./ColorContext";

export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ColorProvider>{children}</ColorProvider>
    </AuthProvider>
  );
}
