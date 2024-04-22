import { Stack } from 'expo-router';

const PasswordResetLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index'/>
  </Stack>
);
export default PasswordResetLayout;
