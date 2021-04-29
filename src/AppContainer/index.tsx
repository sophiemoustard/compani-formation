import React, { useEffect, useContext, useRef } from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import Analytics from '../core/helpers/analytics';
import asyncStorage from '../core/helpers/asyncStorage';
import ProfileEdition from '../screens/profile/ProfileEdition';
import Camera from '../screens/Camera';
import ImagePickerManager from '../screens/ImagePickerManager';
import { Context as AuthContext } from '../context/AuthContext';
import { navigationRef } from '../navigationRef';
import Authentication from '../screens/Authentication';
import EmailForm from '../screens/EmailForm';
import CreateAccount from '../screens/CreateAccount';
import BlendedAbout from '../screens/explore/BlendedAbout';
import ElearningAbout from '../screens/explore/ELearningAbout';
import CourseProfile from '../screens/courses/CourseProfile';
import SubProgramProfile from '../screens/courses/SubProgramProfile';
import ActivityCardContainer from '../screens/courses/ActivityCardContainer';
import QuestionnaireCardContainer from '../screens/courses/QuestionnaireCardContainer';
import MainActions from '../store/main/actions';
import { WHITE } from '../styles/colors';
import { ActionType, ActionWithoutPayloadType, StateType } from '../types/store/StoreType';
import Users from '../api/users';
import { UserType } from '../types/UserType';
import styles from './styles';
import PasswordEdition from '../screens/profile/PasswordEdition';
import PasswordReset from '../screens/PasswordReset';
import Home from '../Home';
import { BLENDED_COURSE_INSCRIPTION } from '../core/data/constants';

const MainStack = createStackNavigator();

interface AppContainerProps {
  setLoggedUser: (user: UserType) => void,
  statusBarVisible: boolean,
}

const AppContainer = ({ setLoggedUser, statusBarVisible }: AppContainerProps) => {
  const { tryLocalSignIn, alenviToken, appIsReady, signOut } = useContext(AuthContext);
  const routeNameRef = useRef<string>();
  const notificationListener = useRef();
  const responseListener = useRef();

  const registerForPushNotificationsAsync = async () => {
    if (!Constants.isDevice) return console.log('Les notifications ne sont pas disponibles sur simulateur');

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    console.log('ici', existingStatus);

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log('là', finalStatus);
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;

    return token;
  };

  const _handleNotification = (notification) => {
    console.log('j\'ai reçu ceci : \n', notification);
  };

  const _handleNotificationResponse = (response) => {
    const { type, _id } = response.notification.request.content.data;
    console.log('type \n', type);
    console.log('_id \n', _id);

    switch (type) {
      case BLENDED_COURSE_INSCRIPTION:
        console.log('ici');
        navigationRef.current?.navigate('CourseProfile', { courseId: _id });
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log('expoToken', token));
    notificationListener.current = Notifications.addNotificationReceivedListener(_handleNotification);
    responseListener.current = Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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

  const handleOnReadyNavigation = () => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  };

  const handleNavigationStateChange = () => {
    const prevRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (prevRouteName !== currentRouteName) {
      Analytics.logScreenView(currentRouteName);
      routeNameRef.current = currentRouteName;
    }
  };

  const style = styles(statusBarVisible, StatusBar.currentHeight);

  const authScreens = { Authentication, EmailForm, CreateAccount, PasswordReset };

  const Profile = { ProfileEdition, PasswordEdition, Camera, ImagePickerManager };
  const Courses = { CourseProfile, SubProgramProfile };
  const userScreens = {
    Home,
    ActivityCardContainer,
    QuestionnaireCardContainer,
    BlendedAbout,
    ElearningAbout,
    ...Profile,
    ...Courses,
  };
  const undismissableScreens = ['ActivityCardContainer', 'QuestionnaireCardContainer'];

  return (
    <NavigationContainer ref={navigationRef} onReady={handleOnReadyNavigation}
      onStateChange={handleNavigationStateChange}>
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
