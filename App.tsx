import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, AppState, Text, Platform, Linking } from 'react-native';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider as AuthProvider } from './src/context/AuthContext';
import getEnvVars from './environment';
import Version from './src/api/version';
import AppContainer from './src/AppContainer';
import { WHITE } from './src/styles/colors';
import reducers from './src/store/index';
import tron from './src/ReactotronConfig';
import NiModal from './src/components/Modal';
import NiButton from './src/components/form/Button';
import { MARGIN } from './src/styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from './src/styles/fonts';

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
  const appUrl = Platform.OS === 'ios'
    ? 'https://apps.apple.com/app/id1447513534'
    : 'market://details?id=com.alenvi.compani';
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
      <NiModal visible={modalOpened}>
        <Text style={styles.title}>Nouvelle version de l'app disponible !</Text>
        <Text style={styles.contentText}>
            Merci de mettre votre application à jour pour pouvoir continuer d'utiliser l'application :)
        </Text>
        <NiButton style={styles.button} caption="Mettre à jour" onPress={() => { Linking.openURL(appUrl); }} />
      </NiModal>
      <AuthProvider>
        <ReduxProvider store={store}>
          <View style={styles.statusBar}>
            <StatusBar translucent barStyle="dark-content" backgroundColor={WHITE} />
          </View>
          <AppContainer />
        </ReduxProvider>
      </AuthProvider>
    </>
  );
};

export default App;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: WHITE,
    height: STATUSBAR_HEIGHT,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.LG,
    textAlign: 'center',
  },
  contentText: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'center',
    marginBottom: MARGIN.LG,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
