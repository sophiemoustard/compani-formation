import { Stack } from 'expo-router';

const StartCardLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index'/>
  </Stack>
);
export default StartCardLayout;
