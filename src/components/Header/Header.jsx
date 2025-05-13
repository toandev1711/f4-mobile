import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import Button from "../Button/Button";

const Header = ({ value, tail, onClick }) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View className="relative flex-row items-center justify-between py-3">
      <TouchableOpacity className="p-0 bg-transparent" onPress={handleBack}>
        <ChevronLeftIcon size={20} color="black" />
      </TouchableOpacity>

      <Text className="absolute left-1/2 -translate-x-1/2 font-bold text-lg text-black">
        {value}
      </Text>
      {tail && (
        <Button
          width="w-20"
          height="h-10"
          onPress={onClick}
          content={tail}
          textColor="text-blue-600"
        />
      )}
    </View>
  );
};

export default Header;
