import instance from "../instance";

export const updateProfile = async ({ userID, key, value, token }) => {
  const formData = new FormData();
  formData.append(key, value);
  console.log(userID, token)
  const response = await instance.put(`/users/${userID}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
    return response.data.result;
};
