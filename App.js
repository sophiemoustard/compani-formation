import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, AppState, Linking } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthenticationScreen from './src/screens/Authentication';
import ProgramListScreen from './src/screens/ProgramList';
import CourseListScreen from './src/screens/CourseList';
import ResolveAuthScreen from './src/screens/ResolveAuth';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import variables from './src/styles/variables';
import getEnvVars from './environment';
import Version from './src/api/version';
import NiModal from './src/components/Modal';

const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen,
  Authentication: AuthenticationScreen,
  mainFlow: createBottomTabNavigator({
    CourseList: CourseListScreen,
    ProgramList: ProgramListScreen,
  })
});


const AppContainer = createAppContainer(switchNavigator);
const App = () => {
  const appUrl = Platform.OS == 'ios' ? '' : 'market://details?id=com.alenvi.compani';
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

    return () => {
      AppState.removeEventListener('change', checkUpdate);
    };
  });

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
          <StatusBar translucent barStyle="dark-content" backgroundColor={variables.NEUTRAL_BACKGROUND_COLOR} />
        </View>
        <AppContainer ref={(navigator) => { setNavigator(navigator); }} />
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
    backgroundColor: variables.NEUTRAL_BACKGROUND_COLOR,
    height: STATUSBAR_HEIGHT,
  },
});
