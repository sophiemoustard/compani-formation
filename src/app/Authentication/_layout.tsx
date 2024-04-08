// @ts-nocheck
import { useContext } from 'react';
import { Stack, Redirect } from 'expo-router';
import { AuthContextType, Context as AuthContext } from '@/context/AuthContext';

const AuthenticationLayout = () => {
  const { companiToken }: AuthContextType = useContext(AuthContext);

  if (companiToken) return <Redirect href="Home" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index'/>
    </Stack>
  );
};
export default AuthenticationLayout;
