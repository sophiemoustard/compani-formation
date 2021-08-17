import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import * as Analytics from 'expo-firebase-analytics';
import * as Notifications from 'expo-notifications';
import { Provider as ReduxProvider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Sentry from 'sentry-expo';
import { Provider as AuthProvider } from '../src/context/AuthContext';
import AppContainer from '../src/AppContainer';
import reducers from '../src/store/index';
import tron from '../src/ReactotronConfig';
import getEnvVars from '../environment';
import { initializeAssets } from '../src/core/helpers/assets';

const { sentryKey } = getEnvVars();
Sentry.init({ dsn: sentryKey, debug: false });

const store = createStore(reducers, tron.createEnhancer());

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: true }),
});

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function startAnalytics() { await Analytics.logEvent('session_start'); }
    startAnalytics();
  }, []);

  if (!appReady) {
    return <AppLoading startAsync={initializeAssets} onFinish={() => setAppReady(true)} onError={console.error} />;
  }

  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <AppContainer />
      </ReduxProvider>
    </AuthProvider>
  );
};

export default App;
