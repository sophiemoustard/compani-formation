import { Stack } from 'expo-router';

const LearnerCoursesLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index'/>
  </Stack>
);
export default LearnerCoursesLayout;
