import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../instance";
import axios from "axios";

export const getBookingHistory = async (userId) => {
  try {
    const response = await instance.get(`/booking/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching booking history:", error);
    throw error;
  }
};
