import React, { useEffect, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import AuthenticationScreen from './screens/Authentication';
import ForgotPasswordScreen from './screens/ForgotPassword';
import ProgramListScreen from './screens/ProgramList';
import CourseListScreen from './screens/courses/CourseList';
import CourseProfileScreen from './screens/courses/CourseProfile';
import ProfileScreen from './screens/Profile';
import { Context as AuthContext } from './context/AuthContext';
import { navigationRef } from './navigationRef';
import { PINK } from './styles/colors';

const CourseStack = createStackNavigator();

const Courses = () => (
  <CourseStack.Navigator headerMode="none">
    <CourseStack.Screen name="CourseList" component={CourseListScreen} />
    <CourseStack.Screen name="CourseProfile" component={CourseProfileScreen} />
  </CourseStack.Navigator>
);

const Tab = createBottomTabNavigator();

const tabBarIcon = route => ({ size, color }) => {
  const icons = { Courses: 'book', ProgramList: 'search', Profile: 'person-outline' };

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
      tabBarOptions={{ activeTintColor: PINK[500] }}
      screenOptions={screenOptions}
    >
      <Tab.Screen name="ProgramList" component={ProgramListScreen} options={{ tabBarLabel: 'Explorer' }} />
      <Tab.Screen name="Courses" component={Courses} options={{ tabBarLabel: 'Mes formations' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profil' }} />
    </Tab.Navigator>
  );
};

const MainStack = createStackNavigator();

export const AppContainer = () => {
  const { tryLocalSignIn, token, appIsReady } = useContext(AuthContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tryLocalSignIn(); }, []);

  if (!appIsReady) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {token === null
          ? <>
            <MainStack.Screen name="Authentication" component={AuthenticationScreen} />
            <MainStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
          : <MainStack.Screen name="Home" component={Home} />}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
