import instance from "../instance";

export const createProfile = async (formData) => {
  try {
    const response = await instance.post(`/users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.result
  } catch (error) {
    console.log(error)
  }
};