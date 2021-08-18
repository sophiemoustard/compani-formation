import React, { useContext } from 'react';
import PasswordForm from '../../components/PasswordForm';
import { NavigationType } from '../../types/NavigationType';
import Authentication from '../../api/authentication';
import { Context as AuthContext } from '../../context/AuthContext';

interface PasswordResetProps {
  route: { params: { userId: string, token: string, email?: string } },
  navigation: NavigationType,
}

const PasswordReset = ({ route, navigation }: PasswordResetProps) => {
  const { userId, email, token } = route.params;
  const { signIn } = useContext(AuthContext);

  const goBack = () => { navigation.navigate('EmailForm'); };

  const savePassword = async (password) => {
    await Authentication.updatePassword(userId, { local: { password } }, token);
    await signIn({ email, password });
  };

  return (
    <PasswordForm goBack={goBack} onPress={savePassword} />
  );
};

export default PasswordReset;
