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
import { navigate } from '../../navigationRef';

interface CreateAccountProps {
  route: { params: { email: string } },
  navigation: NavigationType,
}

const CreateAccount = ({ route, navigation }: CreateAccountProps) => {
  const isIOS = Platform.OS === 'ios';
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [isLoading] = useState<boolean>(false);
  const { email } = route.params;
  const [account, setAccount] = useState({ email, firstname: '', lastname: '', phone: '', password: '' });
  const form = [
    [{
      type: 'text',
      field: 'firstname',
      title: 'Quel est ton prénom ?',
      caption: 'Prénom',
      value: '',
      isValid: true,
      errorMessage: '',
      isTouched: false,
    }],
    [{
      type: 'text',
      field: 'lastname',
      title: 'Quel est ton nom ?',
      caption: 'Nom',
      value: '',
      isValid: false,
      errorMessage: 'Ce champ est obligatoire',
      isTouched: false,
    }],
    [{
      type: 'phone',
      field: 'phone',
      title: 'Quel est ton numéro de téléphone ?',
      caption: 'Téléphone',
      value: '',
      isValid: true,
      errorMessage: 'Ton numéro de téléphone n\'est pas valide',
      isTouched: false,
    }],
    [{
      type: 'password',
      field: 'password',
      title: 'Créer ton mot de passe',
      caption: 'Mot de passe',
      value: '',
      isValid: false,
      errorMessage: 'Le mot de passe doit comporter au minimum 6 caractères',
      isTouched: false,
    },
    {
      type: 'password',
      field: 'confirmedPassword',
      title: 'Créer ton mot de passe',
      caption: 'Confirmer mot de passe',
      value: '',
      isValid: false,
      errorMessage: 'Ton mot de passe et sa confirmation ne correspondent pas',
      isTouched: false,
    }],
  ];

  const keyboardDidHide = () => Keyboard.dismiss();
  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  const hardwareBackPress = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  const goBack = i => (i > 0 ? navigate(`field-${i - 1}`) : navigation.navigate('FirstConnection'));

  const quit = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Authentication');
  };

  const sendToParent = (text, field) => {
    setAccount({ ...account, [field]: text });
  };

  const renderCardScreen = (fields: Array<any>, i: number) => (
    <Stack.Screen key={fields[0].title} name={`field-${i}`}>
      {() => (
        <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
          <View style={styles.goBack}>
            <IconButton name='arrow-left' onPress={() => goBack(i)} size={ICON.MD} color={GREY[600]} />
            <ExitModal onPressConfirmButton={() => quit()} visible={exitConfirmationModal}
              onPressCancelButton={() => setExitConfirmationModal(false)}
              title={'Es-tu sûr de cela ?'} contentText={'Tu reviendras à la page d\'accueil.'} />
            <ProgressBar progress={((i + 1) / form.length) * 100} />
          </View>
          <CreateAccountForm isLoading={isLoading} datas={fields} sendToParent={sendToParent} index={i}/>
        </KeyboardAvoidingView>
      )}
    </Stack.Screen>
  );

  const Stack = createStackNavigator();

  return (form && (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        form.map((fields, i) => renderCardScreen(fields, i))
      }
    </Stack.Navigator>)
  );
};

export default CreateAccount;
