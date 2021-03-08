import React, { useEffect, useContext } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import asyncStorage from '../core/helpers/asyncStorage';
import ProfileDetails from '../screens/profile/Profile';
import ProfileEdition from '../screens/profile/ProfileEdition';
import Camera from '../screens/Camera';
import ImagePickerManager from '../screens/ImagePickerManager';
import { Context as AuthContext } from '../context/AuthContext';
import { navigationRef } from '../navigationRef';
import Authentication from '../screens/Authentication';
import EmailForm from '../screens/EmailForm';
import CreateAccount from '../screens/CreateAccount';
import Catalog from '../screens/explore/Catalog';
import BlendedAbout from '../screens/explore/BlendedAbout';
import ElearningAbout from '../screens/explore/ELearningAbout';
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
import PasswordReset from '../screens/PasswordReset';
import CatalogIcon from '../../assets/icons/CatalogIcon';
import CatalogSelectedIcon from '../../assets/icons/CatalogSelectedIcon';
import CoursesIcon from '../../assets/icons/CoursesIcon';
import CoursesSelectedIcon from '../../assets/icons/CoursesSelectedIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import ProfileSelectedIcon from '../../assets/icons/ProfileSelectedIcon';

const Tab = createBottomTabNavigator();

interface tabBarProps {
  focused: boolean
}

const Home = () => {
  const style = styles();

  return (
    <Tab.Navigator
      tabBarOptions={{ showLabel: false, style: { height: 72 } }}
      initialRouteName="Courses"
    >
      <Tab.Screen name="Catalog" component={Catalog} options={{
        tabBarIcon: ({ focused }: tabBarProps) => (focused
          ? <View style={style.iconContainer}>
            <CatalogSelectedIcon />
            <Text style={style.iconText}>Explorer</Text>
          </View>
          : <CatalogIcon style={style.iconContainer} />),
      }} />
      <Tab.Screen name="Courses" component={CourseList} options={{
        tabBarIcon: ({ focused }: tabBarProps) => (focused
          ? <View style={style.iconContainer}>
            <CoursesSelectedIcon />
            <Text style={style.iconText}>Mes formations</Text>
          </View>
          : <CoursesIcon style={style.iconContainer} />),
      }} />
      <Tab.Screen name="Profile" component={ProfileDetails} options={{
        tabBarIcon: ({ focused }: tabBarProps) => (focused
          ? <View style={style.iconContainer}>
            <ProfileSelectedIcon />
            <Text style={style.iconText}>Profil</Text>
          </View>
          : <ProfileIcon style={style.iconContainer} />),
      }} />
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

  const authScreens = { Authentication, EmailForm, CreateAccount, PasswordReset };

  const Profile = { ProfileEdition, PasswordEdition, Camera, ImagePickerManager };
  const Courses = { CourseProfile, SubProgramProfile };
  const userScreens = { Home, CardContainer, BlendedAbout, ElearningAbout, ...Profile, ...Courses };
  const undismissableScreens = ['CardContainer'];

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={style.statusBar}>
        <StatusBar hidden={!statusBarVisible} translucent barStyle="dark-content" backgroundColor={WHITE} />
      </View>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries(alenviToken ? userScreens : authScreens)
          .map(([name, component]) => (
            <MainStack.Screen key={name} name={name} component={component}
              options={undismissableScreens.includes(name) ? { gestureEnabled: false } : {}} />
          ))}
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
