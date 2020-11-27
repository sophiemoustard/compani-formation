import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import ExitModal from '../../components/ExitModal';
import IconButton from '../../components/IconButton';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../styles/metrics';
import { NavigationType } from '../../types/NavigationType';
import NiButton from '../../components/form/Button';
import NiErrorMessage from '../../components/ErrorMessage';
import styles from './styles';
import { GREY, PINK, WHITE } from '../../styles/colors';
import { PHONE_REGEX } from '../../core/data/constants';
import CreateAccountForm from '../../components/CreateAccountForm';

interface CreateAccountProps {
  route: { params: { email: string } },
  navigation: NavigationType,
}

const CreateAccount = ({ route, navigation }: CreateAccountProps) => {
  const isIOS = Platform.OS === 'ios';
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [data, setData] = useState({
    email: route.params.email,
    firstname: '',
    lastname: '',
    phone: '',
    password: '',
    confirmedPassword: '',
  });
  const [unvalid, setUnvalid] = useState({
    firstname: false,
    lastname: true,
    phone: false,
    password: true,
    confirmedPassword: true,
  });

  const pages = ['firstname', 'lastname', 'phone', 'password'];
  const focus = ['firstname', 'lastname', 'phone', 'password', 'confirmedPassword'];
  const [focusedOn, setFocusedOn] = useState<string>(focus[0]);
  const [pageOn, setPageOn] = useState<string>(pages[0]);

  const [isValid, setIsValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState({
    firstname: false,
    lastname: false,
    phone: false,
    password: false,
    confirmedPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [formProps, setFormProps] = useState({
    type: 'firstname',
    fields: ['firstname'],
    title: 'Quel est ton prénom ?',
    captions: ['Prénom'],
    datas: [data.firstname],
    isUnvalid: [false],
    errorMessages: [''],
    isTouched: [isTouched.firstname],
  });

  const keyboardDidHide = () => Keyboard.dismiss();
  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  const hardwareBackPress = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  const fieldVerification = () => {
    switch (focusedOn) {
      case 'lastname':
        return data.lastname === '';
      case 'phone':
        return !data.phone.match(PHONE_REGEX) && !!data.phone;
      case 'password':
        return data.password.length < 6;
      case 'confirmedPassword':
        return data.confirmedPassword !== data.password;
      default:
        return false;
    }
  };

  useEffect(() => {
    setUnvalid({ ...unvalid, [focusedOn]: fieldVerification() });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    switch (pageOn) {
      case 'lastname':
        setFormProps({
          type: 'lastname',
          fields: ['lastname'],
          title: 'Quel est ton nom ?',
          captions: ['Nom'],
          datas: [data.lastname],
          isUnvalid: [unvalid.lastname],
          errorMessages: ['Ce champ est obligatoire'],
          isTouched: [isTouched.lastname],
        });
        break;
      case 'phone':
        setFormProps({
          type: 'phone',
          fields: ['phone'],
          title: 'Quel est ton numéro de téléphone ?',
          captions: ['Téléphone'],
          datas: [data.phone],
          isUnvalid: [unvalid.phone],
          errorMessages: ['Ton numéro de téléphone n\'est pas valide'],
          isTouched: [isTouched.phone],
        });
        break;
      case 'password':
        setFormProps({
          type: 'password',
          fields: ['password', 'confirmedPassword'],
          title: 'Créer ton mot de passe',
          captions: ['Mot de passe', 'Confirmer mot de passe'],
          datas: [data.password, data.confirmedPassword],
          isUnvalid: [unvalid.password, unvalid.confirmedPassword],
          errorMessages: [
            'Le mot de passe doit comporter au minimum 6 caractères',
            'Ton mot de passe et sa confirmation ne correspondent pas',
          ],
          isTouched: [isTouched.password, isTouched.confirmedPassword],
        });
        break;
      default:
        setFormProps({
          type: 'firstname',
          fields: ['firstname'],
          title: 'Quel est ton prénom ?',
          captions: ['Prénom'],
          datas: [data.firstname],
          isUnvalid: [false],
          errorMessages: [''],
          isTouched: [isTouched.firstname],
        });
    }
  }, [pageOn, unvalid, data, isTouched]);

  useEffect(() => {
    setIsValid(!formProps.isUnvalid.includes(true));
  }, [unvalid, formProps]);

  const create = async () => {
    setIsLoading(false);
    setError(true);
    setErrorMessage(`Compte créé Prénom=${data.firstname} Nom=${data.lastname} Tél=${data.phone} Mdp=${data.password}`);
  };

  const setVariables = () => {
    setPageOn(pages[pages.indexOf(pageOn) + 1]);
    setFocusedOn(pages[pages.indexOf(pageOn) + 1]);
    setIsLoading(false);
  };

  const saveData = () => {
    setIsLoading(true);
    if (pageOn !== 'password') {
      setTimeout(setVariables, 100);
    } else create();
  };

  const scrollRef = useRef<ScrollView>(null);

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Authentication');
  };

  const enterData = (text, f) => {
    setFocusedOn(f);
    if (!isTouched[f]) setIsTouched({ ...isTouched, [f]: true });
    setData({ ...data, [f]: text });
  };

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
      <View style={styles.goBack}>
        <IconButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD} color={GREY[600]} />
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title={'Es-tu sûr de cela ?'} contentText={'Tu reviendras à la page d\'accueil.'} />
      </View>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        <CreateAccountForm type={formProps.type} title={formProps.title} captions={formProps.captions}
          datas={formProps.datas} isUnvalid={formProps.isUnvalid} errorMessages={formProps.errorMessages}
          onChangeText={enterData} isTouched={formProps.isTouched} fields={formProps.fields} />
        <View style={styles.footer}>
          <NiButton caption="Valider" onPress={saveData} disabled={!isValid} loading={isLoading}
            bgColor={isValid ? PINK[500] : GREY[500]} color={WHITE} borderColor={isValid ? PINK[500] : GREY[500]} />
          <NiErrorMessage style={styles.errorMessage} message={errorMessage} show={error} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateAccount;
