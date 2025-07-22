import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  use,
} from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { ArrowsUpDownIcon } from "react-native-heroicons/solid";
import SearchAddressInput from "../../components/SearchAddressInput/SearchAddressInput";
import axios from "axios";
import { debounce } from "lodash";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import RecentAddress from "../../components/Transport/RecentAddress/RecentAddress";
import SearchAddTouch from "../../components/SearchAddTouch/SearchAddTouch";
import { useLocation } from "../../context/LocationContext";
export default function SearchLocationScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [staticLocations, setStaticLocations] = useState([]);
  const [focusedInputId, setFocusedInputId] = useState(null);
  const [editableInputId, setEditableInputId] = useState(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const [fromDisplayLocation, setFromDisplayLocation] = useState();
  const { setPickUp, pickUp } = useLocation();
  const [displayCurrentLocation, setDisplayCurrentLocation] =
    useState("Vị trí hiện tại");
  const inputRef = useRef(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const { recentAddressList = [] } = route.params || {};
    const { fromPosition } = route.params;
    setFromDisplayLocation(fromPosition ?? pickUp?.displayName);
    handleInputFocus("input2");
  }, []);
  useEffect(() => {
    setFromDisplayLocation(pickUp?.displayName ?? "Vị trí hiện tại");
    handleInputFocus("input2");
  }, [pickUp]);
  const goBack = () => {
    navigation.goBack();
  };
  const navigateToMap = async (refId, type) => {
    const data = await fetchLatLog(refId);
    navigation.navigate("MapDisplay", {
      lat: data.lat,
      lng: data.lng,
      navType: type,
    });
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
    return R * c;
  };
  const fetchLatLog = async (refId) => {
    try {
      const res = await axios.get("https://maps.vietmap.vn/api/place/v3", {
        params: {
          apikey: "1c03f84d35eeabbf622cb486ba616b713aef60f0c46d1543",
          refid: refId,
        },
      });
      return res.data;
    } catch (err) {}
  };
  const isFetchingRef = useRef(false);

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query || isFetchingRef.current) return;

      isFetchingRef.current = true;

      try {
        const res = await axios.get(
          "https://maps.vietmap.vn/api/autocomplete/v3",
          {
            params: {
              text: query,
              apikey: "1c03f84d35eeabbf622cb486ba616b713aef60f0c46d1543",
            },
          }
        );

        const suggestions = res.data || [];

        const suggestionsWithCoords = await Promise.all(
          suggestions.map(async (item) => {
            // const latlogRes = await fetchLatLog(item.ref_id);
            return {
              ...item,
              // lat: latlogRes.lat,
              // long: latlogRes.lng,
              fullAddress: item.display,
              // distance: (
              //   await haversineDistance(latlogRes.lat, latlogRes.lng)
              // ).toFixed(1),
            };
          })
        );

        setSuggestions(suggestionsWithCoords);
      } catch (err) {
        console.error("Error fetching suggestions:", err?.message || err);
      } finally {
        isFetchingRef.current = false;
      }
    }, 800),
    []
  );

  const handleInputChange = useCallback(
    (text) => {
      setSearchQuery(text);
      fetchSuggestions(text);
    },
    [fetchSuggestions]
  );

  const handleInputFocus = (id) => {
    setFocusedInputId(id);
    setEditableInputId(id);
  };

  const handleInputBlur = (id) => {
    setEditableInputId(null);
    setFocusedInputId(null);
  };

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

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const reverseGeocodedAddress = await getAddressFromCoords(
        location.coords.latitude,
        location.coords.longitude
      );
      setStaticLocations;
      return reverseGeocodedAddress;
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#ccc" />
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white mt-5">
      <View className="flex-row py-3 border-b border-gray-300">
        <View className="flex-1 ">
          <SearchAddTouch
            id="input1"
            placeholder="Chọn điểm đi"
            focusedInputId={focusedInputId}
            editableInputId={editableInputId}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChangeText={handleInputChange}
            currentValue={fromDisplayLocation}
            dotColor="bg-blue-400"
            size={22}
            goBack={goBack}
          />
          <View className="px-12 justify-center">
            <ArrowsUpDownIcon size={19} color="gray" strokeWidth={2} />
          </View>
          <SearchAddTouch
            id="input2"
            placeholder="Chọn điểm đến"
            focusedInputId={focusedInputId}
            editableInputId={editableInputId}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChangeText={handleInputChange}
            currentValue={"Chọn điểm đến"}
            dotColor="bg-red-600"
            size={0}
            tailSize={0}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        className="mt-5 px-2"
      >
        {suggestions?.map((item, idx) => (
          <RecentAddress
            key={idx}
            item={item}
            onPress={() => navigateToMap(item.ref_id, focusedInputId)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
