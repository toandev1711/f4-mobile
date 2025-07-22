import instance from "../instance";
export const getPartners = async (userId, token) => {
  try {
    const response = await instance.get(
      `/messages/partners-with-messages/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Lỗi cập nhật vị trí:", error.message);
  }
};
