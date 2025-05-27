import instance from "../instance";
import { getToken } from "./authToken";

export const getVehicleDetail = async () => {
  const token = await getToken();
  console.log("Gửi token:", token); 

  const response = await instance.get("/driver/VehicleDetailInfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.result;
};
