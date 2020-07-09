import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, AppState, Linking } from 'react-native';
import { Provider as AuthProvider } from './src/context/AuthContext';
import getEnvVars from './environment';
import Version from './src/api/version';
import NiModal from './src/components/Modal';
import { AppContainer } from './src/stack';
import { NEUTRAL_BACKGROUND_COLOR } from './src/styles/variables';


const App = () => {
  const appUrl = Platform.OS == 'ios'
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

  return (
    <>
      <NiModal
        visible={modalOpened}
        title="Nouvelle version de l'app disponible !"
        contentText="Merci de mettre votre application à jour pour pouvoir continuer d'utiliser l'application :)"
        buttonCaption="Mettre à jour"
        onPress={() => { Linking.openURL(appUrl); }}
        onRequestClose={() => setModalOpened(false)}
      />
      <AuthProvider>
        <View style={[styles.statusBar]}>
          <StatusBar translucent barStyle="dark-content" backgroundColor={NEUTRAL_BACKGROUND_COLOR} />
        </View>
        <AppContainer />
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
    backgroundColor: NEUTRAL_BACKGROUND_COLOR,
    height: STATUSBAR_HEIGHT,
  },
});
