import { Tabs } from 'expo-router';
import { ContextProvider as CardProvider } from '@/context/CardContext';

const ActivityCardContainerLayout = () => (
  <CardProvider>
    <Tabs tabBar={() => <></>} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name={'index'} />
      <Tabs.Screen name={'[cardscreen]'} />
    </Tabs>
  </CardProvider>
);

export default ActivityCardContainerLayout;
