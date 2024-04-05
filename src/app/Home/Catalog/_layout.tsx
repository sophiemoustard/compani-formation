import { Stack } from 'expo-router';

const CatalogLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index'/>
  </Stack>
);
export default CatalogLayout;
