import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import Header from "../../../components/Header/Header";
import DocumentCard from "../../../components/ProfileDriver/DocumentCard";
import Button from "../../../components/Button/Button";
import { ExclamationTriangleIcon, ArrowUpTrayIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

import { getIdntifierCar } from "../../../api/DriverInfo/getIdntifierCar";
import { getLicenseCar } from "../../../api/DriverInfo/getLicenseCar";

const DocumentScreen = () => {
  const navigation = useNavigation();
  const [vehicleDocument, setVehicleDocument] = useState(null); // CCCD object
  const [licenseDocuments, setLicenseDocuments] = useState([]); // GPLX array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const vehicleData = await getIdntifierCar(); 
      const licenseData = await getLicenseCar();   

      setVehicleDocument(vehicleData);
      setLicenseDocuments(Array.isArray(licenseData) ? licenseData : []);
      setError(null);
    } catch (err) {
      setError("Không tải được dữ liệu giấy tờ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);


  const documents = [];


  licenseDocuments.forEach((licenseDoc) => {
    documents.push({
      documenttype: "Giấy phép lái xe",
      licenseCarId: licenseDoc.licenseCarId,
      driverId: licenseDoc.driverId,
      id: licenseDoc.licenseNumber,
      licenseClass: licenseDoc.licenseClass,
      place: licenseDoc.place,
      issueDate: licenseDoc.issueDate,
      expiryDate: licenseDoc.expiryDate,
      nationality: licenseDoc.nationality,
      createAt: licenseDoc.createAt,
      statusName: licenseDoc.statusName,
      frontPhoto: licenseDoc.frontPhoto,
      backPhoto: licenseDoc.backPhoto,
    });
  });

  // Thêm CCCD nếu có
  if (vehicleDocument) {
    documents.push({
      documenttype: "Căn cước công dân",
      identifierId: vehicleDocument.identifierId,
      driverId: vehicleDocument.driverId,
      id: vehicleDocument.identifierNumber,
      issueDate: vehicleDocument.issueDate,
      createAt: vehicleDocument.createAt,
      statusName: vehicleDocument.statusName,
      frontPhoto: vehicleDocument.frontPhoto,
      backPhoto: vehicleDocument.backPhoto,
    });
  }


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-4">
        <Text className="text-red-600 text-center mb-4">{error}</Text>
        <Button content="Thử lại" onPress={fetchDocuments} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Header value="Giấy tờ" />

      <View className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex-row items-start space-x-3 rounded-md mb-4">
        <ExclamationTriangleIcon size={20} color="#D97706" />
        <View className="flex-1">
          <Text className="text-sm font-medium text-yellow-800">Cần chú ý</Text>
          <Text className="text-sm text-yellow-700">
            Bạn có giấy tờ đang chờ xác minh hoặc sắp hết hạn. Vui lòng cập nhật để đảm bảo tài khoản của bạn hoạt động bình thường.
          </Text>
        </View>
      </View>

      {documents.length === 0 && (
        <Text className="text-center text-gray-500 mt-8">Chưa có giấy tờ nào.</Text>
      )}

      {documents.map((doc, index) => (
        <DocumentCard
          key={index}
          title={doc.documenttype}
          id={doc.id}
          issueDate={doc.issueDate}
          expiryDate={doc.expiryDate} 
          statusName={doc.statusName}
          onPress={() => navigation.navigate("DocumentDetail", doc)}
        />
      ))}
    </ScrollView>
  );
};

export default DocumentScreen;
