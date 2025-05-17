import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChevronLeftIcon, MapIcon } from "react-native-heroicons/solid";

import axios from "axios";
import { debounce } from "lodash";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";

import SearchAddressInput from "./src/components/SearchAddressInput/SearchAddressInput";
import RecentAddress from "./src/components/Transport/RecentAddress/RecentAddress";

export default function SearchLocationScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [staticLocations, setStaticLocations] = useState([]);
  const [focusedInputId, setFocusedInputId] = useState(null);
  const [editableInputId, setEditableInputId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const [displayCurrentLocation, setDisplayCurrentLocation] = useState(
    "Select your position"
  );

  useEffect(() => {
    const { recentAddressList = [] } = route.params || {};
    setStaticLocations(recentAddressList);
    getCurrentLocation();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSuggestions([]);
        return;
      }
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
        setSuggestions(res.data || []);
      } catch (err) {
        console.error("Vietmap API Error", err);
      }
    }, 200)
  );

  const handleInputChange = useCallback(
    (text) => {
      setSearchQuery(text);
      fetchSuggestions(text);
    },
    [fetchSuggestions]
  );

  const handleInputFocus = (id) => {
    setFocusedInputId(id); // Chỉ cần set lại focused inputId
    setEditableInputId(id); // Khi nhấn vào thẻ, chuyển thành editable
  };

  const handleInputBlur = (id) => {
    setEditableInputId(null); // Khi blur (rời khỏi thẻ), bỏ editable
    setFocusedInputId(null); // Reset focusedId
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
      setDisplayCurrentLocation(reverseGeocodedAddress);
    } catch (error) {}
  };

  const displayList = useMemo(() => {
    return suggestions.length > 0 ? suggestions : staticLocations;
  }, [suggestions]);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row">
        <View className="items-center w-10">
          <ChevronLeftIcon
            className="absolute left-0 top-4"
            size={24}
            onPress={() => goBack()}
          />
        </View>
        <View className="flex-1">
          {/* Thẻ đầu tiên */}
          <TouchableOpacity onPress={() => handleInputFocus("input1")}>
            <View className={`flex-row items-center rounded-xl mb-2 px-3 py-2 ${focusedInputId === "input1" ? "bg-gray-200" : "bg-white"}`}>
              <View className="flex-row flex-1 items-center">
                <View className={`w-3.5 h-3.5 rounded-full mr-2 bg-blue-600`} />
                <Text className="text-gray-800">{displayCurrentLocation || "Select current location"}</Text>
              </View>
              {focusedInputId === "input1" && (
                <SearchAddressInput
                  id="input1"
                  icon={MapIcon}
                  placeholder={displayCurrentLocation || "Select current location"}
                  onChangeText={handleInputChange}
                  focused={focusedInputId === "input1"}
                  editable={editableInputId === "input1"}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              )}
            </View>
          </TouchableOpacity>

          {/* Thẻ thứ hai */}
          <TouchableOpacity onPress={() => handleInputFocus("input2")}>
            <View className={`flex-row items-center rounded-xl mb-2 px-3 py-2 ${focusedInputId === "input2" ? "bg-gray-200" : "bg-white"}`}>
              <View className="flex-row flex-1 items-center">
                <View className={`w-3.5 h-3.5 rounded-full mr-2 bg-red-500`} />
                <Text className="text-gray-800">Search your place</Text>
              </View>
              {focusedInputId === "input2" && (
                <SearchAddressInput
                  id="input2"
                  placeholder="Search your place"
                  onChangeText={handleInputChange}
                  focused={focusedInputId === "input2"}
                  editable={editableInputId === "input2"}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        className="mt-5 mx-2"
      >
        {displayList?.map((item, idx) => (
          <RecentAddress
            key={idx}
            item={item}
            onPress={() => navigateToMap(item.ref_id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
