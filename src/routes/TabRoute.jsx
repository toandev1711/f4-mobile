import { Text } from "react-native";
import {
  HomeIcon as HomeSolid,
  UserIcon as UserSolid,
  BellIcon as BellSolid,
  ChartBarIcon as ChartSolid,
  ChatBubbleBottomCenterTextIcon as ChatSolid,
} from "react-native-heroicons/solid";

import {
  HomeIcon as HomeOutline,
  UserIcon as UserOutline,
  BellIcon as BellOutline,
  ChartBarIcon as ChartOutline,
  ChatBubbleBottomCenterTextIcon as ChatOutline,
} from "react-native-heroicons/outline";

import UserProfileScreen from "../screens/UserProfile/UserProfileScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ChatListScreen from "../screens/Chat/ChatListScreen";
import ActivityScreen from "../screens/Activity/ActivityScreen";
import PartnerListScreen from "../screens/Chat/PartnerListScreen";

const TabRoutes = [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      tabBarLabel: "Home",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? (
          <HomeSolid color={color} size={20} />
        ) : (
          <HomeOutline color={color} size={22} strokeWidth={2.5} />
        ),
    },
  },
  {
    name: "Acitivity",
    component: ActivityScreen,
    options: {
      tabBarLabel: "Hoạt động",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? (
          <BellSolid color={color} size={22} />
        ) : (
          <BellOutline color={color} size={22} strokeWidth={2.5} />
        ),
    },
  },
  {
    name: "Message",
    component: PartnerListScreen,
    options: {
      tabBarLabel: "Tin nhắn",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? (
          <ChatSolid color={color} size={22} />
        ) : (
          <ChatOutline color={color} size={22} strokeWidth={2.5} />
        ),
    },
  },
  {
    name: "UserProfile",
    component: UserProfileScreen,
    options: {
      tabBarLabel: "Tài khoản ",
      tabBarIcon: ({ color, size, focused }) =>
        focused ? (
          <UserSolid color={color} size={22} />
        ) : (
          <UserOutline color={color} size={22} strokeWidth={2.5} />
        ),
    },
  },
];

export default TabRoutes;
