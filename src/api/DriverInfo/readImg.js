import axios from 'axios';;

export const detectLicenseFromImage = async (formData) => {
  const response = await axios.post("http://172.20.10.14:5000/detect_license", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
    console.log("Full response:", response.data);
  return response.data;
};

export const detectCccdFromImage = async (formData) => {
  const response = await axios.post("http://172.20.10.14:5000/detect_id", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
    console.log("Full response:", response.data);
  return response.data;
};