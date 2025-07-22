import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../instance";
import axios from "axios";

export const cancelBooking = async (bookingId) => {
  const token = await AsyncStorage.getItem("token");
  try {
    await instance.get(`/booking/cancel/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error cancel booking history:", error);
    throw error;
  }
};
