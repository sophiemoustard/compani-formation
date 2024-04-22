// @ts-nocheck
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PasswordForm from '@/components/PasswordForm';
import Authentication from '@/api/authentication';
import styles from './styles';

const PasswordEdition = () => {
  const router = useRouter();
  const { userId } = useLocalSearchParams();

  const goBack = () => {
    router.navigate('/Home/Profile');
  };

  const savePassword = async (password: string) => {
    await Authentication.updatePassword(userId, { local: { password } });
    goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <PasswordForm goBack={goBack} onPress={savePassword} />
    </SafeAreaView>
  );
};

export default PasswordEdition;
