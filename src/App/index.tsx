// @ts-nocheck

import { useState, useEffect, useCallback } from 'react';
import { createStore } from 'redux';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Provider as ReduxProvider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as Sentry from 'sentry-expo';
import { Provider as AuthProvider } from '../context/AuthContext';
import AppContainer from '../AppContainer';
import reducers from '../store/index';
import Environment from '../../environment';
import { initializeAssets } from '../core/helpers/assets';
import { isIOS, LOCAL, DEVELOPMENT, PRODUCTION } from '../core/data/constants';

const { expoConfig } = Constants;

const getVariables = () => {
  switch (expoConfig?.extra.PROFILE) {
    case LOCAL:
      return { appName: 'Compani - local', bundleIdentifier: 'com.alenvi.compani.local' };
    case DEVELOPMENT:
      return { appName: 'Compani - Dev', bundleIdentifier: 'com.alenvi.compani.dev' };
    case PRODUCTION:
      return { appName: 'Compani', bundleIdentifier: 'com.alenvi.compani' };
    default:
      return 'Compani';
  }
};

const variables = getVariables();

const release = isIOS
  ? `${variables.bundleIdentifier}@${expoConfig?.version}+${expoConfig?.ios.buildNumber}`
  : `${variables.bundleIdentifier}@${expoConfig?.version}+${expoConfig?.android.versionCode}`;

Sentry.init({
  dsn: Environment.getSentryKey(),
  debug: false,
  enableInExpoDevelopment: true,
  release,
});

const store = createStore(reducers);

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: true }),
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await initializeAssets();
      } catch (e) {
        console.error(e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(
    async () => {
      if (appReady) await SplashScreen.hideAsync();
    },
    [appReady]
  );

  if (!appReady) return null;

  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <AppContainer onLayout={onLayoutRootView} />
      </ReduxProvider>
    </AuthProvider>
  );
};

export default App;
