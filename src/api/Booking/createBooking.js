import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../instance";
import axios from "axios";
function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (deg) => (deg * Math.PI) / 180;

  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

export const createBooking = async (bookingData) => {
  try {
    console.log("Creating booking with data:", bookingData);
    const userID = await AsyncStorage.getItem("userID");
    const response = await instance.post(
      "/booking/create",
      {
        userId: userID,
        orderType: bookingData.orderType,
        vehicleTypeId: bookingData.vehicleTypeId,
        pickupAddress: bookingData.pickupAddress,
        dropOffAddress: bookingData.dropOffAddress,
        discountCode: "NO_DISCOUNT",
        descriptionNotes: "Handle with care",
        pickupLatitude: bookingData.pickupLatitude,
        pickupLongitude: bookingData.pickupLongitude,
        dropoffLatitude: bookingData.dropoffLatitude,
        dropoffLongitude: bookingData.dropoffLongitude,
        distance: haversineDistance(
          bookingData.pickupLatitude,
          bookingData.pickupLongitude,
          bookingData.dropoffLatitude,
          bookingData.dropoffLongitude
        ),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Booking failed:", error);
    alert("Đặt đơn không thành công!");
  }
};
