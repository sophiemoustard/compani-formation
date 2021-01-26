import React, { useContext } from 'react';
import { StackActions } from '@react-navigation/native';
import PasswordForm from '../../components/PasswordForm';
import { NavigationType } from '../../types/NavigationType';
import Users from '../../api/users';
import { Context as AuthContext } from '../../context/AuthContext';

interface PasswordEditionProps {
  route: { params: { userId: string, token: string, email?: string } },
  navigation: NavigationType,
}

const PasswordEdition = ({ route, navigation }: PasswordEditionProps) => {
  const { userId, email, token } = route.params;
  const { signIn } = useContext(AuthContext);

  const goBack = () => { navigation.navigate('EmailForm'); };

  const savePassword = async (password) => {
    await Users.updatePassword(userId, { local: { password } }, token);
    await signIn({ email, password });
    navigation.dispatch(StackActions.replace('Home', { screen: 'Courses', params: { screen: 'CourseList' } }));
  };

  return (
    <PasswordForm goBack={goBack} onPress={savePassword} />
  );
};

export default PasswordEdition;
