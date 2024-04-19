import { Stack } from 'expo-router';
import { ContextProvider as CreateAccountProvider } from '@/context/createAccountContext';

const CreateAccountLayout = () => (
  <CreateAccountProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='[field]' />
    </Stack>
  </CreateAccountProvider>
);

export default CreateAccountLayout;
