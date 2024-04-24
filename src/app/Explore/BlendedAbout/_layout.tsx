import { Stack } from 'expo-router';

const BlendedAboutLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index'/>
  </Stack>
);
export default BlendedAboutLayout;
