// api/uploadImageDocker.js
import instance from "../instance";

export const updateImage = async (formData) => {
  const response = await instance.post("/images/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 20000,
  });

  return response.data.result;
};
