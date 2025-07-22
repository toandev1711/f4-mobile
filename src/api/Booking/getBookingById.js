import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../instance";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export const getBookingById = async (bookingId) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await instance.get(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error get booking:", error);
    throw error;
  }
};
