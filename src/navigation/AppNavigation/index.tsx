import React, { useRef, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Context as AuthContext } from '../../context/AuthContext';
import Analytics from '../../core/helpers/analytics';
import { navigationRef } from '../../navigationRef';
import Home from '../../navigation/Home/index';
import Authentication from '../../screens/Authentication';
import EmailForm from '../../screens/EmailForm';
import CreateAccount from '../../screens/CreateAccount';
import BlendedAbout from '../../screens/explore/BlendedAbout';
import ElearningAbout from '../../screens/explore/ELearningAbout';
import CourseProfile from '../../screens/courses/CourseProfile';
import SubProgramProfile from '../../screens/courses/SubProgramProfile';
import ActivityCardContainer from '../../screens/courses/ActivityCardContainer';
import QuestionnaireCardContainer from '../../screens/courses/QuestionnaireCardContainer';
import ProfileEdition from '../../screens/profile/ProfileEdition';
import Camera from '../../screens/Camera';
import ImagePickerManager from '../../screens/ImagePickerManager';
import PasswordEdition from '../../screens/profile/PasswordEdition';
import PasswordReset from '../../screens/PasswordReset';

const MainStack = createStackNavigator();

const AppNavigation = () => {
  const { alenviToken } = useContext(AuthContext);
  const routeNameRef = useRef<string>();

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

export default AppNavigation;