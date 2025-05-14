import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../../../components/Header/Header";
import CarCard from "../../../components/ProfileDriver/CarCard";
import { useNavigation } from "@react-navigation/native";

const CarInfoScreen = () => {
  const navigation = useNavigation();

  const documents = [
    {
      documenttype:"Đăng ký xe",
      vehicleName: "Honda City",
      vehicleId: "30A-12345",
      registrationDate: "01/01/2024",
      ownerName: "Lân",
      status: "Đang hoạt động",
      vehicleType: "Sedan",
    },
    {
      documenttype:"Đăng ký xe",
      vehicleName: "Toyota Vios",
      vehicleId: "75A-67890",
      registrationDate: "10/03/2023",
      ownerName: "Hải",
      status: "Đang hoạt động",
      vehicleType: "Sedan",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Header value="Thông tin xe" />
      {documents.map((doc, index) => (
        <CarCard
          key={index}
          {...doc}
          onPress={() => navigation.navigate("DocumentDetail",doc)}
        />
      ))}
    </ScrollView>
  );
};

export default CarInfoScreen;
