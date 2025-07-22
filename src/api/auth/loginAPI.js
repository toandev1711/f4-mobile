import instance from "../instance";

export const loginAPI = async ({ phone, password }) => {
  try {
    const response = await instance.post("/auth/user", {
      phone,
      password,
    });
    const token = response.data.result.jwt;

    return response.data.result.jwt;
  } catch (error) {
    console.log(error);
  }
};

export const getMyInfo = async (token) => {
  const response = await instance.get("/users/info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
