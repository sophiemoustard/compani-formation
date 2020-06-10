import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthenticationScreen from './src/screens/Authentication';
import ProgramListScreen from './src/screens/ProgramList';
import CourseListScreen from './src/screens/CourseList';
import ResolveAuthScreen from './src/screens/ResolveAuth';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen,
  Authentication: AuthenticationScreen,
  mainFlow: createBottomTabNavigator({
    CourseList: CourseListScreen,
    ProgramList: ProgramListScreen,
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }} />
    </AuthProvider>
  );
}
