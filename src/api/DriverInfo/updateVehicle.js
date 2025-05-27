import instance from "../instance";
import { getToken } from "./authToken";

export const updateVehicleData = async (vehicleId, vehicleData) => {
  const token = await getToken();
  console.log ("token", token);
  console.log("Gửi vehicleId:", vehicleId);
  console.log("Gửi vehicleData:", vehicleData);

  const response = await instance.put(`/driver/update-vehicle/${vehicleId}`,
    vehicleData,
    {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
      timeout: 20000, 
    }
  );
  return response.data.result;
};
