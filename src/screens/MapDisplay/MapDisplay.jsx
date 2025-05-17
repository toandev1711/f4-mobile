import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import {
  MapIcon,
  PaperAirplaneIcon,
  PhoneIcon,
} from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import RecentAddress from "../../components/Transport/RecentAddress/RecentAddress";
import { pick } from "lodash";

export default function MapDisplay() {
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [route, setRoute] = useState(null);
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [pickedInfo, setPickedInfo] = useState("");
  const navigation = useNavigation();
  const _route = useRoute();
  const { lat, lng } = _route.params;
  const { navType } = _route.params;
  const [distance, setDistance] = useState(0);

  const fetchRoute = async (start, end) => {
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
    try {
      setLoading(true);
      const response = await axios.get(osrmUrl);
      const routeData = response.data.routes[0];
      setRoute(routeData.geometry.coordinates);
    } catch (error) {
      setError("Failed to fetch route");
    } finally {
      setLoading(false);
    }
  };
  function toRad(degrees) {
    return degrees * (Math.PI / 180);
  }
  const haversineDistance = async (lat2, lon2) => {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const R = 6371;

    const dLat = toRad(lat2 - latitude);
    const dLon = toRad(lon2 - longitude);

    const phi1 = toRad(latitude);
    const phi2 = toRad(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    setDistance(R * c);
  };
  useEffect(() => {
    const init = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      if (typeof lat === "number" && typeof lng === "number") {
        setCurrentLocation({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        if (mapRef.current) {
          mapRef.current.animateToRegion(region, 1000);
        }

        const info = await getAddressFromCoords(lat, lng);
        setMarker({ latitude: lat, longitude: lng });
        if (info && info.length > 0) {
          setPickedInfo(info);
          setShowInfo(true);
        }
        await haversineDistance(lat, lng)

      } else {
        setError("Invalid coordinates received");
      }
    };

    init();
  }, [lat, lng]);
  const getAddressFromCoords = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "MyAwesomeApp/1.0 (contact@myemail.com)",
          "Accept-Language": "vi",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.display_name || null;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCurrentLocation({ latitude, longitude });
    await haversineDistance(latitude, longitude);
    const info = await getAddressFromCoords(latitude, longitude);
    if (info && info.length > 0) {
      setPickedInfo(info);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setCurrentLocation(newRegion);
      const info = await getAddressFromCoords(latitude, longitude);
      if (info && info.length > 0) {
        setPickedInfo(info);
        setShowInfo(true);
      }
      setMarker({ latitude, longitude });

      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    } catch (error) {}
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    console.lop(error);
  }

  if (!currentLocation) {
    return (
      <View style={styles.container}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={currentLocation}
        onPress={handleMapPress}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Current Location" />
        )}
        {route && (
          <Polyline
            coordinates={route.map(([lng, lat]) => ({
              latitude: lat,
              longitude: lng,
            }))}
            strokeColor="blue"
            strokeWidth={4}
          />
        )}
      </MapView>

      <View style={styles.infoPanel}>
        <View className="absolute -top-20 right-3">
          <TouchableOpacity
            onPress={getCurrentLocation}
            style={{
              flexDirection: "row",
              justifyContent: "end",
              backgroundColor: "#3b82f6",
              paddingHorizontal: 17,
              paddingVertical: 17,
              borderRadius: 50,
              transform: [{ rotate: '-45deg' }] 
            }}
          >
            <PaperAirplaneIcon color="white" size={22} />
          </TouchableOpacity>
        </View>
        <View className="flex-row py-3 items-center">
          <View className="items-center w-20">
            <MapIcon size={20} color="#60A5FA" />
            <Text className="text-xs text-gray-500">{`${distance.toFixed(1)} km`}</Text>
          </View>
          <View className="flex-1 ml-3 w-10/12">
            <Text className="font-semibold text-black">{pickedInfo}</Text>
            <Text className="text-sm text-gray-500">Viet Nam</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (navType == "input1") {
              if (_route.params?.onReturn) {
                _route.params.onReturn(pickedInfo);
              }
              navigation.goBack();
            }
          }}
          style={{
            marginTop: 10,
            backgroundColor: "green",
            paddingVertical: 12,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 16, padding: '5' }}>
            Choose this pickup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoPanel: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoText: {
    fontWeight: "bold",
    marginBottom: 6,
  },
});
