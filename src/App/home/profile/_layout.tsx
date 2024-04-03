import { Stack } from 'expo-router';

const ProfileLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Profile/index'/>
  </Stack>
);
export default ProfileLayout;
