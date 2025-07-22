import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../instance";
import axios from "axios";

export const ratingBooking = async ({ bookingId, rating, ratingNote }) => {
  try {
    console.log("Rating booking with data:", { bookingId, rating, ratingNote });
    const userID = await AsyncStorage.getItem("userID");
    const response = await instance.post(
      "/booking/rating",
      {
        bookingId: bookingId,
        rating: rating,
        ratingNote: ratingNote,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Rating failed:", error);
  }
};
