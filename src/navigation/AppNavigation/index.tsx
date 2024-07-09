// @ts-nocheck

import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContextType, Context as AuthContext } from '../../context/AuthContext';
import { navigationRef } from '../../navigationRef';
import Home from '../../navigation/Home/index';
import Authentication from '../../screens/Authentication';
import EmailForm from '../../screens/EmailForm';
import LoginCodeForm from '../../screens/LoginCodeForm';
import CreateAccount from '../../screens/CreateAccount';
import BlendedAbout from '../../screens/explore/BlendedAbout';
import ElearningAbout from '../../screens/explore/ELearningAbout';
import LearnerCourseProfile from '../../screens/courses/profile/LearnerCourseProfile';
import TrainerCourseProfile from '../../screens/courses/profile/TrainerCourseProfile';
import AdminCourseProfile from '../../screens/courses/profile/AdminCourseProfile';
import SubProgramProfile from '../../screens/courses/profile/SubProgramProfile';
import ActivityCardContainer from '../../screens/courses/ActivityCardContainer';
import QuestionnaireCardContainer from '../../screens/courses/QuestionnaireCardContainer';
import ProfileEdition from '../../screens/profile/ProfileEdition';
import PasswordEdition from '../../screens/profile/PasswordEdition';
import PasswordReset from '../../screens/PasswordReset';
import { RootStackParamList } from '../../types/NavigationType';

const MainStack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const { companiToken }: AuthContextType = useContext(AuthContext);

  const authScreens = { Authentication, EmailForm, CreateAccount, PasswordReset, LoginCodeForm };

  const Profile = { ProfileEdition, PasswordEdition };
  const Courses = { LearnerCourseProfile, SubProgramProfile, TrainerCourseProfile };
  const userScreens = {
    Home,
    ActivityCardContainer,
    QuestionnaireCardContainer,
    BlendedAbout,
    ElearningAbout,
    AdminCourseProfile,
    ...Profile,
    ...Courses,
  };
  const undismissableScreens = ['ActivityCardContainer', 'QuestionnaireCardContainer'];

  const tabNames = {
    Authentication: 'Authentification',
    EmailForm: 'Quel est votre email ?',
    CreateAccount: 'Création de compte',
    PasswordReset: 'Réinitialisation du mot de passe',
    LoginCodeForm: 'Quel est votre code de connexion ?',
    ProfileEdition: 'Modifier mes informations',
    PasswordEdition: 'Modifier mon mot de passe',
    LearnerCourseProfile: 'Profil de la formation',
    SubProgramProfile: 'Profil du sous-programme',
    TrainerCourseProfile: 'Profil de la formation',
    Home: 'Accueil',
    ActivityCardContainer: 'Activité',
    QuestionnaireCardContainer: 'Questionnaire',
    BlendedAbout: 'A propos',
    ElearningAbout: 'A propos',
    AdminCourseProfile: 'Espace administrateur',
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator screenOptions={{ headerShown: false, cardStyle: { flex: 1 } }} presentation='card'>
        {Object.entries(companiToken ? userScreens : authScreens)
          .map(([name, component]) => (
            <MainStack.Screen key={name} name={name as keyof RootStackParamList} component={component}
              options={
                undismissableScreens.includes(name)
                  ? { gestureEnabled: false, title: tabNames[name] }
                  : { title: tabNames[name] }
              } />
          ))}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
