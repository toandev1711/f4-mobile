// context/LocationContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [dropOff, setDropOff] = useState();
  const [pickUp, setPickUp] = useState();
  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
        {
          method: "GET",
          headers: {
            "User-Agent": "MyAwesomeApp/1.0 (contact@myemail.com)",
            "Accept-Language": "vi",
          },
        }
      );
      const data = await response.json();
      return data.display_name || "Unknown location";
    } catch (error) {
      return "Unknown location";
    }
  };

  const fetchDeviceLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        setLoading(false);
        return;
      }
      const current = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = current.coords;
      const displayName = await getAddressFromCoords(latitude, longitude);

      setPickUp({
        lat: latitude,
        lng: longitude,
        displayName: displayName || "Current Location",
      });
    } catch (error) {
      console.error("Failed to fetch device location:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{ pickUp, dropOff, setPickUp, setDropOff, loading }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
