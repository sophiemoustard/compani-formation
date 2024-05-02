import { Stack } from 'expo-router';

const QuestionnaireStartCardLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index'/>
  </Stack>
);
export default QuestionnaireStartCardLayout;
