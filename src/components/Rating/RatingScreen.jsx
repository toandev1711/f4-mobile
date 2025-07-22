import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import { useAuth } from "../../context/AuthContext";
import { get, set } from "lodash";
import { getBookingById } from "../../api/Booking/getBookingById";
import {
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import RouteCard from "../Activity/RouteCard";
import { ratingBooking } from "../../api/Booking/ratingBooking";

export default function RatingScreen() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [booking, setBooking] = useState(null);
  const { bookingId } = useAuth();
  const handleSubmit = () => {
    console.log("Đánh giá sao:", rating);
    console.log("Nhận xét:", comment);
    Alert.alert("Cảm ơn!", "Bạn đã gửi đánh giá thành công.");

    navigation.navigate("MainTabs");
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);
        setBooking(data);
      } catch (err) {
        console.error("Error in fetchBooking:", err);
      }
    };

    fetchBooking();
  }, []);
  const formatDateTime = (input) => {
    const date = input ? new Date(input) : null;
    if (!date || isNaN(date)) return "Không có dữ liệu";
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };
  return (
    booking && (
      <ScrollView className="flex-1 bg-white px-4 py-6 mt-7">
        <Text className="text-2xl font-semibold">Đánh giá chuyến đi</Text>

        <View className="mb-4  flex-row justify-between items-center">
          <Text className="text-lg text-gray-500">Thời gian</Text>
          <View className="flex-row items-center">
            <Text className="text-sm font-semibold items-center">
              {booking?.createdDate || "17-07-2025"}{" "}
            </Text>
            <DocumentDuplicateIcon size={19} color="#ccc" />
          </View>
        </View>

        <View className="border border-gray-100 rounded-xl p-4 mb-4 flex-row items-center">
          <ExclamationTriangleIcon />
          <Text className="text-sm text-gray-500 ml-3">
            Bạn sẽ không thể đánh giá hoặc khiếu nại về chuyến đi này sau 7 ngày
          </Text>
        </View>

        <View className="border border-gray-200 rounded-xl px-4 mb-4">
          <View className="flex-row items-center my-2 py-2">
            <CurrencyDollarIcon size={24} color="#104d45" />
            <Text className="text-base font-facebook-narrow ml-3">
              Tiền mặt
            </Text>
          </View>
          <View className="flex-row items-center my-2 py-2">
            <UserCircleIcon size={24} color="#104d45" />
            <Text className="text-base ml-3">
              Tài xế: {booking?.driver || "Nguyen Van A"}
            </Text>
          </View>
          <View className="flex-row items-center py-3 border-t border-gray-200 justify-between">
            <Text className="text-base font-semibold">Thành tiền</Text>
            <Text className="text-base font-bold">{booking.price}đ</Text>
          </View>
        </View>

        <RouteCard
          from={booking?.pickupAddress || "Intersection of Chu Van An - Le Loi"}
          to={booking?.dropoffAddress || "40 Nguyễn Sinh Cung"}
          // timeFrom={data?.timeFrom || "10:30 PM"}
          // timeTo={data?.timeTo || "10:36 PM"}
        />
        <View className="my-6">
          <Text className="text-lg font-medium mb-2">Chất lượng chuyến đi</Text>

          <Rating
            count={5}
            defaultRating={rating}
            size={30}
            showRating={false}
            onFinishRating={(value) => setRating(value)}
            selectedColor="#facc15"
            starContainerStyle={{
              justifyContent: "space-between", // Cách đều các sao
              width: 200, // Điều chỉnh độ rộng tổng thể chứa sao
              alignSelf: "center",
            }}
            style={{
              alignSelf: "center",
              marginTop: 10,
              marginRight: 5,
              marginLeft: 5,
            }}
          />
        </View>
        <View className="my-4">
          <Text className="text-lg font-medium mb-2">Nhận xét</Text>
          <TextInput
            placeholder="Hãy chia sẻ trải nghiệm chuyến đi..."
            className="border border-gray-300 rounded-lg p-3 text-base"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        <TouchableOpacity
          className="bg-green-600 rounded-full py-5 my-3"
          onPress={async () => {
            const data = await ratingBooking({
              bookingId,
              rating,
              ratingNote: comment,
            });
            if (data.code !== 1000) {
              Alert.alert(
                "Lỗi",
                "Đánh giá không thành công, vui lòng thử lại."
              );
              return;
            } else {
              Alert.alert("Cảm ơn!", "Bạn đã gửi đánh giá thành công.");
              navigation.navigate("MainTabs");
            }
          }}
        >
          <Text className="text-white text-center font-semibold text-base">
            Đánh giá
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  );
}
