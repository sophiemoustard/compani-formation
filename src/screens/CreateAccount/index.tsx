import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FeatherButton from '../../components/icons/FeatherButton';
import { ICON } from '../../styles/metrics';
import { NavigationType } from '../../types/NavigationType';
import styles from './styles';
import { GREY } from '../../styles/colors';
import CreateAccountForm from '../../components/CreateAccountForm';
import ProgressBar from '../../components/cards/ProgressBar';
import Users from '../../api/users';
import { formatPhoneForPayload } from '../../core/helpers/utils';
import { Context as AuthContext } from '../../context/AuthContext';
import TermoOfUseModal from '../../components/TermOfUseModal';

interface CreateAccountProps {
  route: { params: { email: string } },
  navigation: NavigationType,
}

type CreateAccountDataType = {
  type: string,
  field: string,
  title: string,
  caption: string,
  value: string,
  isValid: boolean,
  errorMessage: string,
  isValidationAttempted: boolean,
  required: boolean,
  openModal?: { text: string, link: string },
}

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

const CreateAccount = ({ route, navigation }: CreateAccountProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { email } = route.params;
  const { signIn, signOut } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formList, setFormList] = useState<CreateAccountDataType[][]>([
    [{
      type: 'text',
      field: 'firstname',
      title: 'Quel est votre prénom ?',
      caption: 'Prénom',
      value: '',
      isValid: true,
      errorMessage: '',
      isValidationAttempted: false,
      required: false,
    }],
    [{
      type: 'text',
      field: 'lastname',
      title: 'Quel est votre nom ?',
      caption: 'Nom',
      value: '',
      isValid: false,
      errorMessage: 'Ce champ est obligatoire',
      isValidationAttempted: false,
      required: true,
    }],
    [{
      type: 'phone',
      field: 'phone',
      title: 'Quel est votre téléphone ?',
      caption: 'Téléphone',
      value: '',
      isValid: true,
      errorMessage: 'Votre numéro de téléphone n\'est pas valide',
      isValidationAttempted: false,
      required: false,
    }],
    [{
      type: 'password',
      field: 'password',
      title: 'Créer votre mot de passe',
      caption: 'Mot de passe',
      value: '',
      isValid: false,
      errorMessage: 'Le mot de passe doit comporter au minimum 6 caractères',
      isValidationAttempted: false,
      required: true,
    },
    {
      type: 'password',
      field: 'confirmedPassword',
      title: 'Créer votre mot de passe',
      caption: 'Confirmer mot de passe',
      value: '',
      isValid: false,
      errorMessage: 'Votre mot de passe et sa confirmation ne correspondent pas',
      isValidationAttempted: false,
      required: true,
      openModal: { text: 'En continuant, vous vous engagez à respecter nos ', link: 'conditions d\'utilisation' },
    }],
  ]);

  const goBack = i => (i > 0
    ? navigation.navigate(`create-account-screen-${i - 1}`)
    : navigation.navigate('EmailForm', { firstConnection: true }));

  const setForm = (data, index) => {
    setFormList(prevFormList => (prevFormList.map((fieldsGroup, i) => (i === index ? data : fieldsGroup))));
  };

  const create = async () => {
    try {
      setIsLoading(true);
      await Users.create(formatCreationPayload(formList, email));
      signIn({ email, password: formList[3][0].value });
    } catch (e) {
      if (e.response.status === 401) signOut();
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => setIsModalVisible(isVisible => !isVisible);

  const renderScreen = (fields: Array<any>, i: number) => (
    <>
      <View style={styles.header}>
        <FeatherButton name='arrow-left' onPress={() => goBack(i)} size={ICON.MD} color={GREY[600]}
          disabled={isLoading} />
        <ProgressBar progress={((i + 1) / formList.length) * 100} />
      </View>
      <CreateAccountForm isLoading={isLoading} data={fields} setData={setForm} index={i} goBack={goBack}
        create={create} openModal={toggleModal} />
      <TermoOfUseModal visible={isModalVisible} onRequestClose={toggleModal} />
    </>
  );

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {formList.map((fields, i) => (
        <Stack.Screen key={fields[0].title} name={`create-account-screen-${i}`}>
          {() => renderScreen(fields, i)}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};

export default CreateAccount;
