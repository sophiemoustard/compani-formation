import React, { useState, useEffect, useContext } from 'react';
import { AppState } from 'react-native';
import { createStore } from 'redux';
import Constants from 'expo-constants';
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
Sentry.init({
  dsn: sentryKey,
  debug: false,
});

const store = createStore(reducers, tron.createEnhancer());

const fetchFonts = () => Font.loadAsync({
  'fira-sans-black': require('./assets/fonts/FiraSans-Black.ttf'),
  'fira-sans-bold': require('./assets/fonts/FiraSans-Bold.ttf'),
  'fira-sans-italic': require('./assets/fonts/FiraSans-Italic.ttf'),
  'fira-sans-medium': require('./assets/fonts/FiraSans-Medium.ttf'),
  'fira-sans-regular': require('./assets/fonts/FiraSans-Regular.ttf'),
  'nunito-semi': require('./assets/fonts/Nunito-SemiBold.ttf'),
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-regular-bold-italic': require('./assets/fonts/Nunito-BoldItalic.ttf'),
  'nunito-light': require('./assets/fonts/Nunito-Light.ttf'),
  'nunito-black': require('./assets/fonts/Nunito-Black.ttf'),
});

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const { signOut } = useContext(AuthContext);

  const shouldUpdate = async (nextState) => {
    try {
      if (nextState === ACTIVE_STATE) {
        const { mustUpdate } = await Version.shouldUpdate({ mobileVersion: Constants.manifest.version });
        setModalOpened(mustUpdate);
      }
    } catch (error) {
      if (error.status === 401) signOut();
      console.error(error);
    }
  };

  useEffect(() => {
    shouldUpdate(ACTIVE_STATE);
    AppState.addEventListener('change', shouldUpdate);

    return () => { AppState.removeEventListener('change', shouldUpdate); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} onError={console.error} />;
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
