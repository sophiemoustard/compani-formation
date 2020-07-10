import React, { useEffect, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import AuthenticationScreen from './screens/Authentication';
import ForgotPasswordScreen from './screens/ForgotPassword';
import ProgramListScreen from './screens/ProgramList';
import CourseListScreen from './screens/CourseList';
import ProfileScreen from './screens/Profile';
import { Context as AuthContext } from './context/AuthContext';
import { navigationRef } from './navigationRef';
import { PRIMARY_COLOR } from './styles/variables';

const Tab = createBottomTabNavigator();

const tabBarIcon = route => ({ size, color }) => {
  const icons = { CourseList: 'book', ProgramList: 'search', Profile: 'person-outline' };

  return (
    <MaterialIcons name={icons[route.name]} color={color} size={size} />
  );
};

tabBarIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

const Home = () => {
  const screenOptions = ({ route }) => ({ tabBarIcon: tabBarIcon(route) });

  return (
    <Tab.Navigator
      tabBarOptions={{ activeTintColor: PRIMARY_COLOR }}
      screenOptions={screenOptions}
    >
      <Tab.Screen name="ProgramList" component={ProgramListScreen} options={{ tabBarLabel: 'Explorer' }} />
      <Tab.Screen name="CourseList" component={CourseListScreen} options={{ tabBarLabel: 'Mes formations' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profil' }} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export const AppContainer = () => {
  const { tryLocalSignIn, token, appIsReady } = useContext(AuthContext);
  useEffect(() => { tryLocalSignIn(); }, []);

  if (!appIsReady) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token === null
          ? <>
            <Stack.Screen name="Authentication" component={AuthenticationScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
          : <Stack.Screen name="Home" component={Home} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
