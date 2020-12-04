import React, { useContext, useState } from 'react';
import { View, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import IconButton from '../../components/IconButton';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../styles/metrics';
import { NavigationType } from '../../types/NavigationType';
import styles from './styles';
import { GREY } from '../../styles/colors';
import CreateAccountForm from '../../components/CreateAccountForm';
import ProgressBar from '../../components/cards/ProgressBar';
import Users from '../../api/users';
import { formatPhoneForPayload } from '../../core/helpers/utils';
import { Context as AuthContext } from '../../context/AuthContext';

interface CreateAccountProps {
  route: { params: { email: string } },
  navigation: NavigationType,
}

const CreateAccount = ({ route, navigation }: CreateAccountProps) => {
  const isIOS = Platform.OS === 'ios';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { email } = route.params;
  const { refreshAlenviToken } = useContext(AuthContext);
  const [formList, setFormList] = useState([
    [{
      type: 'text',
      field: 'firstname',
      title: 'Quel est ton prénom ?',
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
      title: 'Quel est ton nom ?',
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
      title: 'Quel est ton numéro de téléphone ?',
      caption: 'Téléphone',
      value: '',
      isValid: true,
      errorMessage: 'Ton numéro de téléphone n\'est pas valide',
      isValidationAttempted: false,
      required: false,
    }],
    [{
      type: 'password',
      field: 'password',
      title: 'Créer ton mot de passe',
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
      title: 'Créer ton mot de passe',
      caption: 'Confirmer mot de passe',
      value: '',
      isValid: false,
      errorMessage: 'Ton mot de passe et sa confirmation ne correspondent pas',
      isValidationAttempted: false,
      required: true,
    }],
  ]);

  const keyboardDidHide = () => Keyboard.dismiss();
  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  const goBack = i => (i > 0
    ? navigation.navigate(`create-account-screen-${i - 1}`)
    : navigation.navigate('FirstConnection'));

  const setForm = (data, index) => {
    setFormList(prevFormList => (prevFormList
      .map((fieldsGroup, i) => (i === index ? data : fieldsGroup))));
  };

  const saveData = async () => {
    setIsLoading(true);
    const data = {
      identity: formList[0][0].value === ''
        ? { lastname: formList[1][0].value }
        : { lastname: formList[1][0].value, firstname: formList[0][0].value },
      local: { email },
    };
    const user = await Users.create(Object.assign(
      data,
      formList[2][0].value === '' ? null : { contact: { phone: formatPhoneForPayload(formList[2][0].value) } }
    ));
    await refreshAlenviToken(user.refreshToken);

    await Users.updatePassword(user._id, { local: { password: formList[3][0].value } });
    setIsLoading(false);
  };

  const renderScreen = (fields: Array<any>, i: number) => (
    <Stack.Screen key={fields[0].title} name={`create-account-screen-${i}`}>
      {() => (
        <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
          <View style={styles.header}>
            <IconButton name='arrow-left' onPress={() => goBack(i)} size={ICON.MD} color={GREY[600]} />
            <ProgressBar progress={((i + 1) / formList.length) * 100} />
          </View>
          <CreateAccountForm navigation={navigation} isLoading={isLoading} data={fields} setData={setForm} index={i}
            goBack={goBack} saveData={saveData}/>
        </KeyboardAvoidingView>
      )}
    </Stack.Screen>
  );

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {formList.map((fields, i) => renderScreen(fields, i))}
    </Stack.Navigator>
  );
};

export default CreateAccount;
