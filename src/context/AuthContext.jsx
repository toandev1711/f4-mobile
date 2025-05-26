import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginAPI, getMyInfo } from "../api/auth/loginAPI";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  function hasRoleUser(scopeString) {
    if (typeof scopeString !== "string") return false;

    const roles = scopeString.trim().split(/\s+/);
    return roles.includes("ROLE_USER");
  }
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStoredAuth();
  }, []);

  const login = async (data) => {
    try {
      const token = await loginAPI(data);
      if (!token) {
        throw new Error("Token is invalid or missing");
      }
      const userInfo = await getMyInfo(token);
      const decoded = jwtDecode(token);
      const isUser = hasRoleUser(decoded.scope);
      const userID = decoded.sub;
      const roleValue = isUser ? "user" : "driver";
      setRole(roleValue);
      setUser(userInfo.result);
      await AsyncStorage.setItem("user", JSON.stringify(userInfo.result));
      await AsyncStorage.setItem("userID", userID);
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
    } catch (error) { }
  };

  return (
    <AuthContext.Provider
      value={{ setUser, user, token, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
