import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/NavigationType';
import PasswordForm from '../../components/PasswordForm';
import Authentication from '../../api/authentication';
import { Context as AuthContext } from '../../context/AuthContext';
import commonStyles from '../../styles/common';

interface PasswordResetProps extends StackScreenProps<RootStackParamList, 'PasswordReset'> {}

const PasswordReset = ({ route, navigation }: PasswordResetProps) => {
  const { userId, email, token } = route.params;
  const { signIn } = useContext(AuthContext);

  const goBack = () => { navigation.navigate('EmailForm'); };

  const savePassword = async (password) => {
    await Authentication.updatePassword(userId, { local: { password } }, token);
    await signIn({ email, password });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <PasswordForm goBack={goBack} onPress={savePassword} />
    </SafeAreaView>
  );
};

export default PasswordReset;
