import EditProfileForm from '../components/EditProfileForm/EditProfileForm';
import EditUserProfileScreen from '../screens/EditUserProfile/EditUserProfileScreen';
import { Text } from 'react-native';

const StackRoutes = [
  {
    name: 'EditProfile',
    component: EditUserProfileScreen,
    options: { title: 'My Profile', headerShown: false, },
    unmountOnBlur: true
  },
  {
    name: 'EditProfileForm',
    component: EditProfileForm,
    options: { title: 'Form to edit', headerShown: false, },
    unmountOnBlur: true
  },
];

export default StackRoutes;
