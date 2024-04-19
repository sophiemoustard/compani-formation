// @ts-nocheck
import { View, Linking } from 'react-native';
import { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FeatherButton from '@/components/icons/FeatherButton';
import { ICON } from '@/styles/metrics';
import commonStyles from '@/styles/common';
import styles from './styles';
import { GREY } from '@/styles/colors';
import CreateAccountForm from '@/components/CreateAccountForm';
import ProgressBar from '@/components/cards/ProgressBar';
import Users from '@/api/users';
import { formatPhoneForPayload } from '@/core/helpers/utils';
import { AuthContextType, Context as AuthContext } from '@/context/AuthContext';
import { ACCOUNT_CREATION } from '@/core/data/constants';
import { Context } from '@/context/createAccountContext';
import { CreateAccountDataType } from '@/types/CreateAccountDataType';

const formatCreationPayload = (formList: CreateAccountDataType[][], email) => {
  const data = {
    identity: formList[0][0].value === ''
      ? { lastname: formList[1][0].value }
      : { lastname: formList[1][0].value, firstname: formList[0][0].value },
    local: { email, password: formList[3][0].value },
  };

  return Object.assign(
    data,
    formList[2][0].value === '' ? null : { contact: { phone: formatPhoneForPayload(formList[2][0].value) } }
  );
};

const CreateAccount = () => {
  const router = useRouter();
  const { field, email: emailAddress } = useLocalSearchParams();
  const { signIn }: AuthContextType = useContext(AuthContext);
  const { formList, setFormList, isLoading, setIsLoading, email, setEmail } = useContext(Context);
  const fieldIndex = Number(field);

  useEffect(() => {
    if (fieldIndex === 0) setEmail(emailAddress);
  }, [fieldIndex, emailAddress, setEmail]);

  const goBack = i => (
    i > 0
      ? router.navigate(`/Authentication/CreateAccount/${i - 1}`)
      : router.navigate({ pathname: '/Authentication/EmailForm/', params: { firstConnection: false } })
  );
  const setForm = (data, index) => {
    setFormList(prevFormList => (prevFormList.map((fieldsGroup, i) => (i === index ? data : fieldsGroup))));
  };

  const create = async () => {
    try {
      setIsLoading(true);
      await Users.create(formatCreationPayload(formList, email));
      signIn({ email, password: formList[3][0].value, mobileConnectionMode: ACCOUNT_CREATION });
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderScreen = () => (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <FeatherButton name='arrow-left' onPress={() => goBack(fieldIndex)} size={ICON.MD} color={GREY[600]}
          disabled={false} />
        <View style={commonStyles.progressBarContainer}>
          <ProgressBar progress={((fieldIndex + 1) / formList.length) * 100} />
        </View>
      </View>
      <CreateAccountForm isLoading={isLoading} data={formList[fieldIndex]} setData={setForm} index={fieldIndex}
        goBack={goBack} create={create} openUrl={() => Linking.openURL('https://www.compani.fr/cgu-cgv')} />
    </SafeAreaView>
  );
  return (
    renderScreen()
  );
};

export default CreateAccount;
