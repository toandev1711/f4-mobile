import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CircleAvatar from "../../components/CircleAvatar/CircleAvtar";
import Header from "../../components/Header/Header";
import ProfileField from "../../components/ProfileField/ProfileField";

const EditUserProfileScreen = () => {
  const navtigation = useNavigation();
  const [profileField] = useState([
    {
      label: "Name",
      value: "Minh Toàn",
      type: "text",
      note: "Bạn chỉ có thể thay đổi tên người dùng trong vòng 30 ngày kể từ lần đăng ký đầu tiên. Sau thời gian này, tên người dùng sẽ không thể thay đổi",
    },
    {
      label: "Phone Number",
      value: "123123123",
      type: "text",
      note: "Số điện thoại của bạn sẽ được sử dụng để xác thực tài khoản và phục hồi mật khẩu. Hãy đảm bảo rằng số điện thoại là chính xác và còn hoạt động",
    },
    {
      label: "Email",
      value: "lvmtoan@gmail.com",
      type: "text",
      note: "Email của bạn sẽ được sử dụng để xác thực tài khoản và phục hồi mật khẩu. Hãy đảm bảo rằng email là chính xác và còn hoạt động",
    },
    {
      label: "Password",
      value: "********",
      type: "password",
    },
  ]);

  const handleEdit = (field) => {
    navtigation.navigate("EditProfileForm", {
      label: field.label,
      type: field.type,
      value: field.value,
      note: field.note,
    });
  };

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Header value="Edit Profile" />
      <View className="items-center justify-center mb-6">
        <CircleAvatar />
      </View>
      <ScrollView className="space-y-4">
        {profileField.map((field, index) => (
          <ProfileField key={index} label={field.label} value={field.value} onClick={() => handleEdit(field)} />
        ))}
      </ScrollView>
    </View>
  );
};

export default EditUserProfileScreen;
