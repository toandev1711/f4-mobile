import instance from "../instance";
import { getToken } from "./authToken";

export const updatePersonalData = async (personalData) => {
  const token = await getToken();
  console.log ("token", token);
  console.log("personalData:", personalData);

  const response = await instance.put(`/driver/update-cccd`,personalData,
    {
      headers: {
    'Authorization': `Bearer ${token}`, 
      },
      timeout: 20000,
    }
    
  );
  return response.data.result;
};
