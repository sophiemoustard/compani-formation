import { Stack } from 'expo-router';

const ProfileLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PasswordEdition" />
    <Stack.Screen name="ProfileEdition" />
  </Stack>
);
export default ProfileLayout;
