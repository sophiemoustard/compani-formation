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
      <Stack.Screen name='EmailForm'/>
      <Stack.Screen name='LoginCodeForm'/>
      <Stack.Screen name='CreateAccount'/>
      <Stack.Screen name='PasswordReset'/>
    </Stack>
  );
};
export default AuthenticationLayout;
