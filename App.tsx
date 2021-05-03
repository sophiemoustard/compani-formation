import React, { useState, useEffect, useContext, useRef } from 'react';
import { createStore } from 'redux';
import { AppState } from 'react-native';
import * as Analytics from 'expo-firebase-analytics';
import * as Notifications from 'expo-notifications';
import { Asset } from 'expo-asset';
import { Provider as ReduxProvider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Sentry from 'sentry-expo';
import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext';
import Version from './src/api/version';
import AppContainer from './src/AppContainer';
import UpdateAppModal from './src/components/UpdateAppModal';
import reducers from './src/store/index';
import tron from './src/ReactotronConfig';
import { ACTIVE_STATE } from './src/core/data/constants';
import getEnvVars from './environment';

const { sentryKey } = getEnvVars();
Sentry.init({ dsn: sentryKey, debug: false });

const store = createStore(reducers, tron.createEnhancer());

const fetchFonts = () => Font.loadAsync({
  'fira-sans-black': require('./assets/fonts/FiraSans-Black.ttf'),
  'fira-sans-bold': require('./assets/fonts/FiraSans-Bold.ttf'),
  'fira-sans-bold-italic': require('./assets/fonts/FiraSans-SemiBoldItalic.ttf'),
  'fira-sans-italic': require('./assets/fonts/FiraSans-Italic.ttf'),
  'fira-sans-medium': require('./assets/fonts/FiraSans-Medium.ttf'),
  'fira-sans-regular': require('./assets/fonts/FiraSans-Regular.ttf'),
  'nunito-semi': require('./assets/fonts/Nunito-SemiBold.ttf'),
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-regular-bold-italic': require('./assets/fonts/Nunito-BoldItalic.ttf'),
  'nunito-light': require('./assets/fonts/Nunito-Light.ttf'),
  'nunito-black': require('./assets/fonts/Nunito-Black.ttf'),
});

const fetchAssets = async () => {
  const cachedImages = [
    require('./assets/images/authentication_background_image.jpg'),
    require('./assets/images/aux_detective.png'),
    require('./assets/images/aux_joie.png'),
    require('./assets/images/aux_fierte.png'),
    require('./assets/images/default_avatar.png'),
    require('./assets/images/doct_liste.png'),
    require('./assets/images/end_card_background.png'),
    require('./assets/images/green_section_background.png'),
    require('./assets/images/log_out_background.png'),
    require('./assets/images/pa_aidant_balade.png'),
    require('./assets/images/pink_section_background.png'),
    require('./assets/images/profile_background.png'),
    require('./assets/images/purple_section_background.png'),
    require('./assets/images/start_card_background.png'),
    require('./assets/images/yellow_section_background.png'),
  ];
  const imageAssets = cachedImages.map(img => Asset.fromModule(img).downloadAsync());

  await Promise.all([...imageAssets]);
};

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

  const startLoading = async () => {
    try {
      await fetchFonts();
      await fetchAssets();
    } catch (error) {
      console.error(error);
    }
  };

  if (!appReady) {
    return <AppLoading startAsync={startLoading} onFinish={() => setAppReady(true)} onError={console.error} />;
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
