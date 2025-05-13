import { Text } from "react-native";
import {
  HomeIcon as HomeSolid,
  UserIcon as UserSolid,
  BellIcon as BellSolid,
  ChartBarIcon as ChartSolid,
} from "react-native-heroicons/solid";

import {
  HomeIcon as HomeOutline,
  UserIcon as UserOutline,
  BellIcon as BellOutline,
  ChartBarIcon as ChartOutline,
} from "react-native-heroicons/outline";

import UserProfileScreen from "../screens/UserProfile/UserProfileScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

const TabRoutes = [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      tabBarLabel: "Home",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? <HomeSolid color={color} size={20} /> : <HomeOutline color={color} size={20} />,
    },
  },
  {
    name: "Vallet",
    component: HomeScreen,
    options: {
      tabBarLabel: "Vallet",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? <ChartSolid color={color} size={20} /> : <ChartOutline color={color} size={20} />,
    },
  },
  {
    name: "Activity",
    component: HomeScreen,
    options: {
      tabBarLabel: "Activity",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? <BellSolid color={color} size={20} /> : <BellOutline color={color} size={20} />,
    },
  },
  {
    name: "UserProfile",
    component: UserProfileScreen,
    options: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? <UserSolid color={color} size={20} /> : <UserOutline color={color} size={20} />,
    },
  },
];

export default TabRoutes;
