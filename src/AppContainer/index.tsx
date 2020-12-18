import React, { useEffect, useContext } from 'react';
import { StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import '../ReactotronConfig';
import asyncStorage from '../core/helpers/asyncStorage';
import ProfileDetails from '../screens/profile/Profile';
import ProfileEdition from '../screens/profile/ProfileEdition';
import Camera from '../screens/Camera';
import { Context as AuthContext } from '../context/AuthContext';
import { navigationRef } from '../navigationRef';
import Authentication from '../screens/Authentication';
import EmailForm from '../screens/EmailForm';
import CreateAccount from '../screens/CreateAccount';
import Catalog from '../screens/explore/Catalog';
import About from '../screens/explore/About';
import CourseList from '../screens/courses/CourseList';
import CourseProfile from '../screens/courses/CourseProfile';
import SubProgramProfile from '../screens/courses/SubProgramProfile';
import CardContainer from '../screens/courses/CardContainer';
import MainActions from '../store/main/actions';
import { PINK, WHITE } from '../styles/colors';
import { ActionType, ActionWithoutPayloadType, StateType } from '../types/store/StoreType';
import Users from '../api/users';
import { UserType } from '../types/UserType';
import styles from './styles';
import PasswordEdition from '../screens/profile/PasswordEdition';

interface TabBarIconProps {
  color: string,
  size: number,
}

const Tab = createBottomTabNavigator();

const tabBarIcon = route => ({ size, color }: TabBarIconProps) => {
  const icons = { Courses: 'book', Catalog: 'search', Profile: 'person-outline' };

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
      <Tab.Screen name="Catalog" component={Catalog} options={{ tabBarLabel: 'Explorer' }} />
      <Tab.Screen name="Courses" component={CourseList} options={{ tabBarLabel: 'Mes formations' }} />
      <Tab.Screen name="Profile" component={ProfileDetails} options={{ tabBarLabel: 'Profil' }} />
    </Tab.Navigator>
  );
};

const MainStack = createStackNavigator();

interface AppContainerProps {
  setLoggedUser: (user: UserType) => void,
  statusBarVisible: boolean,
}

const AppContainer = ({ setLoggedUser, statusBarVisible }: AppContainerProps) => {
  const { tryLocalSignIn, alenviToken, appIsReady, signOut } = useContext(AuthContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tryLocalSignIn(); }, []);

  useEffect(() => {
    async function setUser() {
      try {
        const userId = await asyncStorage.getUserId();
        const user = await Users.getById(userId);
        setLoggedUser(user);
      } catch (e) {
        if (e.status === 401) signOut();
        console.error(e);
      }
    }
    if (alenviToken) setUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alenviToken]);

  if (!appIsReady) return null;

  const style = styles(statusBarVisible, StatusBar.currentHeight || 20);

  const authScreens = { Authentication, EmailForm, CreateAccount };

  const Profile = { ProfileEdition, PasswordEdition, Camera };
  const Courses = { CourseProfile, SubProgramProfile };
  const userScreens = { Home, CardContainer, About, ...Profile, ...Courses };

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={style.statusBar}>
        <StatusBar hidden={!statusBarVisible} translucent barStyle="dark-content" backgroundColor={WHITE} />
      </View>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries(alenviToken ? userScreens : authScreens)
          .map(([name, component]) => (<MainStack.Screen key={name} name={name} component={component} />))}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: StateType) => ({
  statusBarVisible: state.main.statusBarVisible,
});

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
