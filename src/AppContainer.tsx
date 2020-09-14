import React, { useEffect, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Authentication from './screens/Authentication';
import ForgotPassword from './screens/ForgotPassword';
import ProgramList from './screens/ProgramList';
import CourseList from './screens/courses/CourseList';
import CourseProfile from './screens/courses/CourseProfile';
import CardContainer from './screens/courses/CardContainer';
import Profile from './screens/Profile';
import { Context as AuthContext } from './context/AuthContext';
import { navigationRef } from './navigationRef';
import { PINK } from './styles/colors';

interface tabBarIconProps {
  color: string,
  size: number,
}

const CourseStack = createStackNavigator();

const Courses = () => (
  <CourseStack.Navigator headerMode="none">
    <CourseStack.Screen name="CourseList" component={CourseList} />
    <CourseStack.Screen name="CourseProfile" component={CourseProfile} />
  </CourseStack.Navigator>
);

const Tab = createBottomTabNavigator();

const tabBarIcon = route => ({ size, color }: tabBarIconProps) => {
  const icons = { Courses: 'book', ProgramList: 'search', Profile: 'person-outline' };

  return (
    <MaterialIcons name={icons[route.name]} color={color} size={size} />
  );
};

const Home = () => {
  const screenOptions = ({ route }) => ({ tabBarIcon: tabBarIcon(route) });

  return (
    <Tab.Navigator
      tabBarOptions={{ activeTintColor: PINK[500] }}
      screenOptions={screenOptions}
      initialRouteName="Courses"
    >
      <Tab.Screen name="ProgramList" component={ProgramList} options={{ tabBarLabel: 'Explorer' }} />
      <Tab.Screen name="Courses" component={Courses} options={{ tabBarLabel: 'Mes formations' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Profil' }} />
    </Tab.Navigator>
  );
};

const MainStack = createStackNavigator();

export const AppContainer = () => {
  const { tryLocalSignIn, alenviToken, appIsReady } = useContext(AuthContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tryLocalSignIn(); }, []);

  if (!appIsReady) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {alenviToken === null
          ? <>
            <MainStack.Screen name="Authentication" component={Authentication} />
            <MainStack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
          : <>
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="CardContainer" component={CardContainer} options={{ gestureEnabled: false }} />
          </>
        }
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
