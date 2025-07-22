import { Text } from "react-native";
import {
  HomeIcon as HomeSolid,
  UserIcon as UserSolid,
  Bars3Icon as MenuSolid,
} from "react-native-heroicons/solid";

import {
  HomeIcon as HomeOutline,
  UserIcon as UserOutline,
  Bars3Icon as MenuOutline,
} from "react-native-heroicons/outline";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileDriverScreen from "../screens/ProfileDriver/DriverProfile/ProfileDriverScreen";
import DriverSideBarScreen from "../screens/ProfileDriver/DriverProfile/DriverSideBarScreen";

const TabRoutesDriver = [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      tabBarLabel: "Home",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? (
          <HomeSolid color={color} size={20} />
        ) : (
          <HomeOutline color={color} size={20} />
        ),
    },
  },

  {
    name: "Profile",
    component: ProfileDriverScreen,
    options: {
      tabBarLabel: "Profiles",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? (
          <UserSolid color={color} size={20} />
        ) : (
          <UserOutline color={color} size={20} />
        ),
    },
  },
  {
    name: "DriverSideBarScreen",
    component: DriverSideBarScreen,
    options: {
      tabBarLabel: "Menu",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? (
          <MenuOutline color={color} size={20} />
        ) : (
          <MenuOutline color={color} size={20} />
        ),
    },
  },
];

export default TabRoutesDriver;
