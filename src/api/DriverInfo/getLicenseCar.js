import instance from "../instance";
import { getToken } from "./authToken";

export const getLicenseCar = async () => {
  const token = await getToken();
  console.log("Gửi token:", token); 

  const response = await instance.get("/driver/LicenseCarInfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.result;
};
