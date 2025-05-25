import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, View, Text } from "react-native";
import Header from "../../../components/Header/Header";
import CarCard from "../../../components/ProfileDriver/CarCard";
import { getVehicleDetail } from "../../../api/DriverInfo/getVehicleDetail";
import { useNavigation } from "@react-navigation/native";

const CarInfoScreen = () => {
  const navigation = useNavigation();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const data = await getVehicleDetail();
        const mappedData = data.map((item) => ({
          documenttype: "Thông Tin Xe",
          vehicleId: item.vehicleId,
          driverId: item.driverId,
          engineNumber: item.engineNumber,
          createAt: item.createAt,
          vehicleTypeName: item.vehicleTypeName,
          brand: item.brand,
          licensePlateNumber: item.licensePlateNumber,
          issueDate: item.issueDate,
          ownerName: item.ownerName,
          statusName: item.statusName,
          vehicleTypeName: item.vehicleTypeName,
          frontPhoto: item.frontPhoto,
          backPhoto: item.backPhoto,

        }));
        setDocuments(mappedData);
      } catch (error) {
        console.error("Lỗi lấy thông tin xe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Header value="Thông tin xe" />
      {documents.map((doc, index) => (
        <CarCard
          key={index}
          documenttype={doc.documenttype}
          brand={doc.brand}
          licensePlateNumber={doc.licensePlateNumber}
          issueDate={doc.issueDate}
          ownerName={doc.ownerName}
          statusName={doc.statusName}
          vehicleTypeName={doc.vehicleTypeName}
          frontPhoto={doc.frontPhoto}
          backPhoto={doc.backPhoto}
          onPress={() => navigation.navigate("DocumentDetail", { ...doc })}
        />
      ))}
    </ScrollView>
  );
};

export default CarInfoScreen;
