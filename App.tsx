import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, AppState, Linking, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider as AuthProvider } from './src/context/AuthContext';
import getEnvVars from './environment';
import Version from './src/api/version';
import ConfirmModal from './src/components/modal/ConfirmModal';
import { AppContainer } from './src/AppContainer';
import { WHITE } from './src/styles/colors';
import reducers from './src/store/index';

const store = createStore(reducers);

const fetchFonts = () => Font.loadAsync({
  'fira-sans-black': require('./assets/fonts/FiraSans-Black.ttf'),
  'fira-sans-bold': require('./assets/fonts/FiraSans-Bold.ttf'),
  'fira-sans-italic': require('./assets/fonts/FiraSans-Italic.ttf'),
  'fira-sans-medium': require('./assets/fonts/FiraSans-Medium.ttf'),
  'fira-sans-regular': require('./assets/fonts/FiraSans-Regular.ttf'),
  'nunito-semi': require('./assets/fonts/Nunito-SemiBold.ttf'),
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-regular-bold-italic': require('./assets/fonts/Nunito-BoldItalic.ttf'),
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
      <ConfirmModal
        visible={modalOpened}
        title="Nouvelle version de l'app disponible !"
        contentText="Merci de mettre votre application à jour pour pouvoir continuer d'utiliser l'application :)"
        buttonCaption="Mettre à jour"
        onPress={() => { Linking.openURL(appUrl); }}
        onRequestClose={() => setModalOpened(false)}
      />
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
});
