import React from 'react';
import PasswordForm from '../../../components/PasswordForm';
import { NavigationType } from '../../../types/NavigationType';
import Users from '../../../api/users';

interface PasswordEditionProps {
  route: { params: { userId: string, email?: string } },
  navigation: NavigationType,
}

const PasswordEdition = ({ route, navigation }: PasswordEditionProps) => {
  const { userId } = route.params;

  const goBack = () => {
    navigation.navigate('Home', { screen: 'Profile', params: { screen: 'Profile' } });
  };

  const savePassword = async (password) => {
    await Users.updatePassword(userId, { local: { password } });
    goBack();
  };

  return (
    <PasswordForm goBack={goBack} onPress={savePassword} />
  );
};

export default PasswordEdition;
