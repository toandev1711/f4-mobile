import instance from "../instance";
import { getToken } from "./authToken";

export const updateLicenseData = async (licenseCarId, licenseData) => {
  const token = await getToken();
  console.log ("token", token);
  console.log(" Gửi licenseCarId:", licenseCarId);
  console.log(" Gửi licenseData:", licenseData);

  const response = await instance.put(
    `/driver/update-license-car/${licenseCarId}`,
    licenseData,
    {
      headers: {
    'Authorization': `Bearer ${token}`, 
      },
    timeout: 20000, 
    }
  );
  return response.data.result;
};
