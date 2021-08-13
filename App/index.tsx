import React, { useState, useEffect, useContext } from 'react';
import { createStore } from 'redux';
import { AppState } from 'react-native';
import * as Analytics from 'expo-firebase-analytics';
import * as Notifications from 'expo-notifications';
import { Provider as ReduxProvider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Sentry from 'sentry-expo';
import { Provider as AuthProvider, Context as AuthContext } from '../src/context/AuthContext';
import Version from '../src/api/version';
import AppContainer from '../src/AppContainer';
import UpdateAppModal from '../src/components/UpdateAppModal';
import reducers from '../src/store/index';
import tron from '../src/ReactotronConfig';
import { ACTIVE_STATE } from '../src/core/data/constants';
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
  const [modalOpened, setModalOpened] = useState(false);
  const { signOut } = useContext(AuthContext);

  const shouldUpdate = async (nextState) => {
    try {
      if (nextState === ACTIVE_STATE) {
        const { mustUpdate } = await Version.shouldUpdate();
        setModalOpened(mustUpdate);
      }
    } catch (error) {
      if (error.status === 401) signOut();
      console.error(error);
    }
  };

  useEffect(() => {
    async function startAnalytics() { await Analytics.logEvent('session_start'); }
    startAnalytics();
  }, []);

  useEffect(() => {
    shouldUpdate(ACTIVE_STATE);
    AppState.addEventListener('change', shouldUpdate);

    return () => { AppState.removeEventListener('change', shouldUpdate); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!appReady) {
    return <AppLoading startAsync={initializeAssets} onFinish={() => setAppReady(true)} onError={console.error} />;
  }

  return (
    <>
      <UpdateAppModal visible={modalOpened} />
      <AuthProvider>
        <ReduxProvider store={store}>
          <AppContainer />
        </ReduxProvider>
      </AuthProvider>
    </>
  );
};

export default App;
