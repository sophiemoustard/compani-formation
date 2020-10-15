import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider as AuthProvider } from './src/context/AuthContext';
import getEnvVars from './environment';
import Version from './src/api/version';
import AppContainer from './src/AppContainer';
import UpdateAppModal from './src/components/UpdateAppModal';
import reducers from './src/store/index';
import tron from './src/ReactotronConfig';

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

  const checkUpdate = async (nextState) => {
    if (nextState === 'active') {
      const envVars = getEnvVars();
      const { mustUpdate } = await Version.checkUpdate({ apiVersion: envVars.apiVersion });
      setModalOpened(mustUpdate);
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', checkUpdate);

    return () => { AppState.removeEventListener('change', checkUpdate); };
  }, []);

  if (!fontLoaded) return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;

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
