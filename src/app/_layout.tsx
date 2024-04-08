// @ts-nocheck

import { useEffect } from 'react';
import { createStore } from 'redux';
import { Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { Provider as ReduxProvider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as Sentry from '@sentry/react-native';
import { Provider as AuthProvider } from '../context/AuthContext';
import AppContainer from '@/AppContainer';
import reducers from '@/store/index';
import Environment from '../../environment';
import { initializeAssets } from '@/core/helpers/assets';

Sentry.init({ dsn: Environment.getSentryKey(), debug: false });

const store = createStore(reducers);

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: true }),
});

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  useEffect(() => {
    async function prepare() {
      try {
        await initializeAssets();
      } catch (e) {
        console.error(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <AppContainer>
          <Stack>
            <Stack.Screen name='index'/>
          </Stack>
        </AppContainer>
      </ReduxProvider>
    </AuthProvider>
  );
};

export default Sentry.wrap(MainLayout);
