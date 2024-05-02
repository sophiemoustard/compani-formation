import { Stack } from 'expo-router';
import { ContextProvider as CreateAccountProvider } from '@/context/AccountCreationContext';

const CreateAccountLayout = () => (
  <CreateAccountProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='[field]' />
    </Stack>
  </CreateAccountProvider>
);

export default CreateAccountLayout;
