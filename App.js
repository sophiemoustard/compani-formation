import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, AppState } from 'react-native';
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

const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen,
  Authentication: AuthenticationScreen,
  mainFlow: createBottomTabNavigator({
    CourseList: CourseListScreen,
    ProgramList: ProgramListScreen,
  })
});


const AppContainer = createAppContainer(switchNavigator);
export default App = () => {
  const [mustUpdate, setMustUpdate] = useState(false);

  checkUpdate = async (nextState) => {
    if (nextState === 'active') {
      const envVars = getEnvVars();
      const checkUpdate = await Version.checkUpdate({ apiVersion: envVars.apiVersion });
      setMustUpdate(checkUpdate.mustUpdate);
    }
  }

  useEffect(() => {
    AppState.addEventListener('change', checkUpdate);

    return () => {
      setMustUpdate(false);
      AppState.removeEventListener('change', checkUpdate);
    }
  });

  return (
    <AuthProvider>
      <View style={[styles.statusBar]}>
        <StatusBar translucent barStyle="dark-content" backgroundColor={variables.NEUTRAL_BACKGROUND_COLOR} />
      </View>
      <App ref={(navigator) => { setNavigator(navigator); }} />
    </AuthProvider>
  );
};

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
