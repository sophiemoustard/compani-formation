import { Stack } from 'expo-router';

const ProfileEditionLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index'/>
  </Stack>
);
export default ProfileEditionLayout;
