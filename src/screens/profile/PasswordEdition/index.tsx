import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/NavigationType';
import PasswordForm from '../../../components/PasswordForm';
import Authentication from '../../../api/authentication';

interface PasswordEditionProps extends StackScreenProps<RootStackParamList, 'PasswordEdition'> {}

const PasswordEdition = ({ route, navigation }: PasswordEditionProps) => {
  const { userId } = route.params;

  const goBack = () => {
    navigation.navigate('Home', { screen: 'Profile', params: { screen: 'Profile' } });
  };

  const savePassword = async (password) => {
    await Authentication.updatePassword(userId, { local: { password } });
    goBack();
  };

  return (
    <PasswordForm goBack={goBack} onPress={savePassword} />
  );
};

export default PasswordEdition;
