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
import ActivityHistoryScreen from "../screens/Activity/ActivityHistoryScreen";
import HistoryDetailScreen from "../screens/Activity/HistoryDetailScreen";
import UpdateVehicleDocument from "../screens/ProfileDriver/Documents/UpdateVehicleDocument";
import UpdatePersonalDocument from "../screens/ProfileDriver/Documents/UpdatePersonalDocument";
import UpdateLicenseDocument from "../screens/ProfileDriver/Documents/UpdateLicenseDocument";
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
    name: "ChatDetail",
    component: ChatDetailScreen,
    options: { title: "My Profile", headerShown: false },
  },
  {
    name: "ActivityHistory",
    component: ActivityHistoryScreen,
    options: { title: "activity", headerShown: false },
  },
  {
    name: "ActivityHistoryDetail",
    component: HistoryDetailScreen,
    options: { title: "activity", headerShown: false },
  },
  {
    name: "UpdateVehicleDocument",
    component: UpdateVehicleDocument,
    options: { title: "UpdateVehicleDocument", headerShown: false },
  },
  {
    name: "UpdateLicenseDocument",
    component: UpdateLicenseDocument,
    options: { title: "UpdateLicenseDocument", headerShown: false },
  },
  {
    name: "UpdatePersonalDocument",
    component: UpdatePersonalDocument,
    options: { title: "UpdatePersonalDocument", headerShown: false },
  }, 
];

export default StackRoutes;
