import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import axios from "axios";
import { MapIcon, PaperAirplaneIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLocation } from "../../context/LocationContext";
export default function MapDisplay() {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const { params } = useRoute();
  const { lat, lng, navType } = params;
  const { pickUp, setPickUp, setDropOff } = useLocation();
  const [route, setRoute] = useState(null);
  const [marker, setMarker] = useState(null);
  const [pickedInfo, setPickedInfo] = useState(null);
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const region = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

  const getAddressFromCoords = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "MyAwesomeApp/1.0 (contact@myemail.com)",
          "Accept-Language": "vi",
        },
      });
      const data = await response.json();
      return data.display_name || null;
    } catch {
      return null;
    }
  };

  const toRad = (degrees) => degrees * (Math.PI / 180);

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const phi1 = toRad(lat1);
    const phi2 = toRad(lat2);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const fetchRoute = async (start, end) => {
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
    try {
      setLoading(true);
      const response = await axios.get(osrmUrl);
      setRoute(response.data.routes[0].geometry.coordinates);
    } catch {
      setError("Failed to fetch route");
    } finally {
      setLoading(false);
    }
  };

  const init = async () => {
    const displayName = await getAddressFromCoords(lat, lng);
    setPickedInfo({ displayName, lat, lng });
    setMarker({ latitude: lat, longitude: lng });
    setDistance(haversineDistance(lat, lng, lat, lng)); // You can replace with real from-location
  };

  useEffect(() => {
    init();
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        },
        1000 // thời gian animation (ms)
      );
    }
  }, [lat, lng]);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    const displayName = await getAddressFromCoords(latitude, longitude);
    setPickedInfo({ displayName, lat: latitude, lng: longitude });
    setDistance(haversineDistance(lat, lng, latitude, longitude));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onPress={handleMapPress}
        cameraZoomRange={110}
      >
        {marker && <Marker coordinate={marker} title="Selected Location" />}
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
        <View className="flex-row py-3 items-center">
          <View className="items-center w-20">
            <MapIcon size={20} color="#60A5FA" />
            <Text className="text-xs text-gray-500">
              {`${distance.toFixed(1)} km`}
            </Text>
          </View>
          <View className="flex-1 ml-3 w-10/12">
            <Text className="font-semibold text-black">
              {pickedInfo?.displayName}
            </Text>
            <Text className="text-sm text-gray-500">Viet Nam</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (navType === "input1") {
              setPickUp({
                lat: pickedInfo.lat,
                lng: pickedInfo.lng,
                displayName: pickedInfo.displayName,
              });
              navigation.goBack();
            } else if (navType === "input2") {
              setDropOff({
                lat: pickedInfo.lat,
                lng: pickedInfo.lng,
                displayName: pickedInfo.displayName,
              });
              navigation.navigate("BookingScreen");
            }
          }}
          style={{
            marginTop: 10,
            backgroundColor: "green",
            paddingVertical: 12,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
            Chọn vị trí này
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
});
