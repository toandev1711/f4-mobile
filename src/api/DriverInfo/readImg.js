import axios from 'axios';;

export const detectLicenseFromImage = async (imageFile) => {
  const response = await axios.post("http://127.0.0.1:5000/detect_license", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.result;
};
