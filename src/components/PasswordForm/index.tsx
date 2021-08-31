import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  Text,
  ScrollView,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import FeatherButton from '../icons/FeatherButton';
import NiPrimaryButton from '../form/PrimaryButton';
import { GREY } from '../../styles/colors';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../styles/metrics';
import styles from './styles';
import NiInput from '../form/Input';
import { Context as AuthContext } from '../../context/AuthContext';
import ExitModal from '../ExitModal';
import NiErrorMessage from '../ErrorMessage';

interface PasswordFormProps {
  goBack: () => void,
  onPress: (password: string) => void,
}

const PasswordForm = ({ onPress, goBack }: PasswordFormProps) => {
  const isIOS = Platform.OS === 'ios';
  const { signOut } = useContext(AuthContext);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [password, setPassword] =
    useState<{ newPassword: string, confirmedPassword: string }>({ newPassword: '', confirmedPassword: '' });
  const [unvalid, setUnvalid] = useState({ newPassword: false, confirmedPassword: false });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);

  const keyboardDidHide = () => Keyboard.dismiss();

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => { Keyboard.removeListener('keyboardDidHide', keyboardDidHide); };
  });

  const hardwareBackPress = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, []);

  useEffect(() => {
    setUnvalid({
      newPassword: password.newPassword.length < 6,
      confirmedPassword: password.confirmedPassword !== password.newPassword,
    });
  }, [password]);

  useEffect(() => {
    const { newPassword, confirmedPassword } = unvalid;
    setIsValid(!(newPassword || confirmedPassword));
  }, [unvalid]);

  const toggleModal = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    goBack();
  };

  const savePassword = async () => {
    try {
      setIsValidationAttempted(true);
      if (isValid) {
        setIsLoading(true);
        setError(false);
        setErrorMessage('');

        await onPress(password.newPassword);
      }
    } catch (e: any) {
      if (e.response.status === 401) signOut();
      setError(true);
      setErrorMessage('Erreur, si le problème persiste, contactez le support technique.');
    } finally {
      setIsLoading(false);
    }
  };

  const setPasswordField = (text, key) => { setPassword({ ...password, [key]: text }); };

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      <View style={styles.goBack}>
        <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD}
          color={GREY[600]} disabled={isLoading} />
        <ExitModal onPressConfirmButton={toggleModal} visible={exitConfirmationModal}
          title={'Êtes-vous sûr(e) de cela ?'} onPressCancelButton={() => setExitConfirmationModal(false)}
          contentText={'Vos modifications ne seront pas enregistrées.'} />
      </View>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Modifier mon mot de passe</Text>
        <View style={styles.input}>
          <NiInput caption="Nouveau mot de passe" value={password.newPassword}
            type="password" onChangeText={text => setPasswordField(text, 'newPassword')}
            validationMessage={unvalid.newPassword && isValidationAttempted
              ? 'Le mot de passe doit comporter au minimum 6 caractères'
              : ''} />
        </View>
        <View style={styles.input}>
          <NiInput caption="Confirmer mot de passe" value={password.confirmedPassword}
            type="password" onChangeText={text => setPasswordField(text, 'confirmedPassword')}
            validationMessage={unvalid.confirmedPassword && isValidationAttempted
              ? 'Votre nouveau mot de passe et sa confirmation ne correspondent pas'
              : ''} />
        </View>
        <View style={styles.footer}>
          <NiErrorMessage message={errorMessage} show={error} />
          <NiPrimaryButton caption="Valider" onPress={savePassword} loading={isLoading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordForm;
