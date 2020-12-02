import React, { useEffect, useState } from 'react';
import { View, Keyboard, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ExitModal from '../../components/ExitModal';
import IconButton from '../../components/IconButton';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../styles/metrics';
import { NavigationType } from '../../types/NavigationType';
import styles from './styles';
import { GREY } from '../../styles/colors';
import CreateAccountForm from '../../components/CreateAccountForm';
import ProgressBar from '../../components/cards/ProgressBar';

interface CreateAccountProps {
  route: { params: { email: string } },
  navigation: NavigationType,
}

const CreateAccount = ({ route, navigation }: CreateAccountProps) => {
  const isIOS = Platform.OS === 'ios';
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [isLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email } = route.params;
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

  const hardwareBackPress = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  const goBack = i => (i > 0
    ? navigation.navigate(`create-account-screen-${i - 1}`)
    : navigation.navigate('FirstConnection'));

  const cancelAccountCreation = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Authentication');
  };

  const setForm = (data, index) => {
    setFormList(prevFormList => (prevFormList
      .map((fieldsGroup, i) => (i === index ? data : fieldsGroup))));
  };

  const renderScreen = (fields: Array<any>, i: number) => (
    <Stack.Screen key={fields[0].title} name={`create-account-screen-${i}`}>
      {() => (
        <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
          <View style={styles.header}>
            <IconButton name='arrow-left' onPress={() => goBack(i)} size={ICON.MD} color={GREY[600]} />
            <ExitModal onPressConfirmButton={cancelAccountCreation} visible={exitConfirmationModal}
              onPressCancelButton={() => setExitConfirmationModal(false)}
              title={'Es-tu sûr de cela ?'} contentText={'Tu reviendras à la page d\'accueil.'} />
            <ProgressBar progress={((i + 1) / formList.length) * 100} />
          </View>
          <CreateAccountForm navigation={navigation} isLoading={isLoading} data={fields} setData={setForm} index={i}/>
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
