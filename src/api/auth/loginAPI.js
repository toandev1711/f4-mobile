import instance from "../instance";

export const login = async ({ phone, password }) => {
  try {
    const response = await instance.post("/auth/login", {
      phone,
      password,
    });
    return response.data
  } catch (error) {
   
  }
};
