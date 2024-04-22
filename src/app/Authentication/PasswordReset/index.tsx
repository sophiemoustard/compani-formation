// @ts-nocheck

import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PasswordForm from '@/components/PasswordForm';
import Authentication from '@/api/authentication';
import { AuthContextType, Context as AuthContext } from '@/context/AuthContext';
import styles from './styles';

const PasswordReset = () => {
  const router = useRouter();
  const { userId, email, token, mobileConnectionMode } = useLocalSearchParams();
  const { signIn }: AuthContextType = useContext(AuthContext);

  const goBack = () => { router.back(); };

  const savePassword = async (password: string) => {
    await Authentication.updatePassword(userId, { local: { password } }, token);
    await signIn({ email, password, mobileConnectionMode });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <PasswordForm goBack={goBack} onPress={savePassword} email={email} />
    </SafeAreaView>
  );
};

export default PasswordReset;
