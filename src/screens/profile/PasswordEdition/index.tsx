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
import { StackActions } from '@react-navigation/native';
import FeatherButton from '../../../components/icons/FeatherButton';
import NiButton from '../../../components/form/Button';
import { GREY, PINK, WHITE } from '../../../styles/colors';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../../styles/metrics';
import styles from './styles';
import NiInput from '../../../components/form/Input';
import { NavigationType } from '../../../types/NavigationType';
import Users from '../../../api/users';
import { Context as AuthContext } from '../../../context/AuthContext';
import ExitModal from '../../../components/ExitModal';
import NiErrorMessage from '../../../components/ErrorMessage';

interface PasswordEditionProps {
  route: { params: { userId: string, isPasswordForgotten?: boolean, email?: string } },
  navigation: NavigationType,
}

const PasswordEdition = ({ route, navigation }: PasswordEditionProps) => {
  const isIOS = Platform.OS === 'ios';
  const { signOut, signIn } = useContext(AuthContext);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [password, setPassword] = useState({ newPassword: '', confirmedPassword: '' });
  const [unvalid, setUnvalid] = useState({ newPassword: false, confirmedPassword: false });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const { userId, isPasswordForgotten, email } = route.params;

  const keyboardDidHide = () => Keyboard.dismiss();

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  });

  const hardwareBackPress = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unvalid]);

  const scrollRef = useRef<ScrollView>(null);

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    if (isPasswordForgotten) navigation.navigate('EmailForm');
    else navigation.navigate('Home', { screen: 'Profile', params: { screen: 'Profile' } });
  };

  const savePassword = async () => {
    try {
      setIsValidationAttempted(true);
      if (isValid) {
        setIsLoading(true);
        setError(false);
        setErrorMessage('');
        await Users.updatePassword(userId, { local: { password: password.newPassword } });
        if (isPasswordForgotten && !!email) {
          try {
            await signIn({ email, password: password.newPassword });
            navigation.dispatch(StackActions.replace('Home', { screen: 'Courses', params: { screen: 'CourseList' } }));
          } catch (e) {
            if (e.status === 401) signOut();
          }
        } else goBack();
      }
    } catch (e) {
      if (e.status === 401) signOut();
      setError(true);
      setErrorMessage('Erreur, si le problème persiste, contactez le support technique.');
    } finally {
      setIsLoading(false);
    }
  };

  const setPasswordField = (text, key) => {
    setPassword({ ...password, [key]: text });
  };

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      <View style={styles.goBack}>
        <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD}
          color={GREY[600]} disabled={isLoading} />
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title={'Êtes-vous sûr de cela ?'} contentText={'Vos modifications ne seront pas enregistrées.'} />
      </View>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {isPasswordForgotten ? 'Réinitialiser mon mot de passe' : 'Modifier mon mot de passe'}
        </Text>
        <View style={styles.input}>
          <NiInput caption="Nouveau mot de passe" value={password.newPassword}
            type="password" darkMode={false} onChangeText={text => setPasswordField(text, 'newPassword')}
            validationMessage={unvalid.newPassword && isValidationAttempted
              ? 'Le mot de passe doit comporter au minimum 6 caractères'
              : ''} />
        </View>
        <View style={styles.input}>
          <NiInput caption="Confirmer mot de passe" value={password.confirmedPassword}
            type="password" darkMode={false} onChangeText={text => setPasswordField(text, 'confirmedPassword')}
            validationMessage={unvalid.confirmedPassword && isValidationAttempted
              ? 'Votre nouveau mot de passe et sa confirmation ne correspondent pas'
              : ''} />
        </View>
        <View style={styles.footer}>
          <NiErrorMessage message={errorMessage} show={error} />
          <NiButton caption="Valider" onPress={savePassword} loading={isLoading}
            bgColor={PINK[500]} color={WHITE} borderColor={PINK[500]} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordEdition;
