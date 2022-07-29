import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, RootBottomTabParamList } from '../../../types/NavigationType';
import PasswordForm from '../../../components/PasswordForm';
import Authentication from '../../../api/authentication';

interface PasswordEditionProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'PasswordEdition'>,
StackScreenProps<RootBottomTabParamList>
> {}

const PasswordEdition = ({ route, navigation }: PasswordEditionProps) => {
  const { userId } = route.params;

  const goBack = () => {
    navigation.navigate('Profile');
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
