import instance from "../instance";
import { getToken } from "./authToken";

export const getIdntifierCar = async () => {
  const token = await getToken();
  const response = await instance.get("/driver/IdntifierCarInfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.result;
};
