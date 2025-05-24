import EditProfileForm from "../components/EditProfileForm/EditProfileForm";
import EditUserProfileScreen from "../screens/EditUserProfile/EditUserProfileScreen";
import { Text } from "react-native";
import DocumentScreen from "../screens/ProfileDriver/Documents/DocumentScreen";
import DocumentDetailScreen from "../screens/ProfileDriver/Documents/DocumentDetailScreen";
import WalletScreen from "../screens/ProfileDriver/Wallet/WalletScreen";
import CarInfoScreen from "../screens/ProfileDriver/CarInfo/CarInfoScreen";
import EditDriverProfileScreen from "../screens/ProfileDriver/EditDriverProfile/EditDriverProfileScreen";
import MapDisplay from "../screens/MapDisplay/MapDisplay";
import TransportScreen from "../screens/Transport/TransportScreen";
import SearchLocationScreen from "../screens/SearchLocation/SearchLocationScreen";
import OtpVerificationScreen from "../screens/UserRegister/OtpVerificationScreen";
import ChatDetailScreen from "../screens/Chat/ChatDetailScreen";
const StackRoutes = [
  {
    name: "EditProfile",
    component: EditUserProfileScreen,
    options: { title: "My Profile", headerShown: false },
    unmountOnBlur: true,
  },
  {
    name: "EditProfileForm",
    component: EditProfileForm,
    options: { title: "Form to edit", headerShown: false },
    unmountOnBlur: true,
  },
  {
    name: "CarInfo",
    component: CarInfoScreen,
    options: { title: "CarInfos", headerShown: false },
    unmountOnBlur: true,
  },
  {
    name: "Document",
    component: DocumentScreen,
    options: { title: "Document", headerShown: false },
    unmountOnBlur: true,
  },
  {
    name: "DocumentDetail",
    component: DocumentDetailScreen,
    options: { title: "DocumentDetail", headerShown: false },
    unmountOnBlur: true,
  },

  {
    name: "Wallet",
    component: WalletScreen,
    options: { title: "Wallet", headerShown: false },
    unmountOnBlur: true,
  },
  {
    name: "EditProfileDriver",
    component: EditDriverProfileScreen,
    options: { title: "My Profile", headerShown: false },
    unmountOnBlur: true,
  },
  {
    name: "MapDisplay",
    component: MapDisplay,
    options: { title: "My Profile", headerShown: false },
  },
  {
    name: "Transport",
    component: TransportScreen,
    options: { title: "My Profile", headerShown: false },
  },
  {
    name: "SearchLocation",
    component: SearchLocationScreen,
    options: { title: "My Profile", headerShown: false },
  },
  {
    name: "OtpVerification",
    component: OtpVerificationScreen,
    options: { title: "My Profile", headerShown: false },
  },
  {
    name: 'ChatDetail',
    component: ChatDetailScreen,
    options: { title: "My Profile", headerShown: false },
  }
];

export default StackRoutes;
