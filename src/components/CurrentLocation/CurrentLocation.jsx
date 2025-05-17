import { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import * as Location from "expo-location";
import { Button, TextInput } from "react-native-web";
import { StatusBar } from "expo-status-bar";

export default function CurrentLocation() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please grant location permissions");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    console.log("Location:");
    console.log(currentLocation);
    reverseGeocode()
  };
  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity className="bg-red-300" onPress={() => getPermissions()}>
        <Text>Tuch</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
