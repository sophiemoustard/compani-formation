// @ts-nocheck

import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/NavigationType';
import PasswordForm from '../../components/PasswordForm';
import Authentication from '../../api/authentication';
import { AuthContextType, Context as AuthContext } from '../../context/AuthContext';
import styles from './styles';
import { IDENTITY_VERIFICATION } from '../../core/data/constants';

interface PasswordResetProps extends StackScreenProps<RootStackParamList, 'PasswordReset'> {}

const PasswordReset = ({ route, navigation }: PasswordResetProps) => {
  const { userId, email, token, firstMobileConnectionMode = IDENTITY_VERIFICATION } = route.params;
  const { signIn }: AuthContextType = useContext(AuthContext);

  const goBack = () => { navigation.goBack(); };

  const savePassword = async (password: string) => {
    await Authentication.updatePassword(userId, { local: { password } }, token);
    await signIn({ email, password, firstMobileConnectionMode });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <PasswordForm goBack={goBack} onPress={savePassword} email={email} />
    </SafeAreaView>
  );
};

export default PasswordReset;
