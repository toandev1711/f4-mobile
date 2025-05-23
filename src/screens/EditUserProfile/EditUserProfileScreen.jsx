import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CircleAvatar from "../../components/CircleAvatar/CircleAvtar";
import Header from "../../components/Header/Header";
import ProfileField from "../../components/ProfileField/ProfileField";
import { useAuth } from "../../context/AuthContext";
const EditUserProfileScreen = () => {
  const { user } = useAuth();
  const navtigation = useNavigation();
  const [profileField, setProfileField] = useState([]);
  useEffect(() => {
    if (user) {
      setProfileField([
        {
          label: "Tên đầy đủ",
          value: user.fullName || "Chưa có tên",
          type: "text",
          note: "Bạn chỉ có thể thay đổi tên người dùng trong vòng 30 ngày kể từ lần đăng ký đầu tiên. Sau thời gian này, tên người dùng sẽ không thể thay đổi",
          engLabel: "fullName"
        },
        {
          label: "Số điện thoại",
          value: user.phone || "Chưa có số điện thoại",
          type: "text",
          note: "Số điện thoại của bạn sẽ được sử dụng để xác thực tài khoản và phục hồi mật khẩu. Hãy đảm bảo rằng số điện thoại là chính xác và còn hoạt động",
          engLabel: "phone"
        },
        {
          label: "Email",
          value: user.email || "Chưa có email",
          type: "text",
          note: "Email của bạn sẽ được sử dụng để xác thực tài khoản và phục hồi mật khẩu. Hãy đảm bảo rằng email là chính xác và còn hoạt động",
          engLabel: "email"
        },
        {
          label: "Mật khẩu",
          value: "********",
          type: "password",
          engLabel: "password"
        },
      ]);
    }
  }, [user]);

  const handleEdit = (field) => {
    navtigation.navigate("EditProfileForm", {
      label: field.label,
      type: field.type,
      value: field.value,
      note: field.note,
      engLabel: field.engLabel
    });
  };

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Header value="Chỉnh sửa hồ sơ" />
      <View className="items-center justify-center mb-6">
        <CircleAvatar url={user.profilePicture || ''} />
      </View>
      <ScrollView className="space-y-4">
        {profileField.map((field, index) => (
          <ProfileField
            key={index}
            label={field.label}
            value={field.value}
            onClick={() => handleEdit(field)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default EditUserProfileScreen;
