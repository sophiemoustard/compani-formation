import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import ExitModal from '../../components/ExitModal';
import FeatherButton from '../../components/icons/FeatherButton';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../styles/metrics';
import { NavigationType } from '../../types/NavigationType';
import NiInput from '../../components/form/Input';
import NiButton from '../../components/form/Button';
import styles from './styles';
import accountCreationStyles from '../../styles/accountCreation';
import { GREY, PINK, WHITE } from '../../styles/colors';
import { EMAIL_REGEX } from '../../core/data/constants';
import Users from '../../api/users';
import ForgotPasswordModal from '../../components/ForgotPasswordModal';

interface EmailFormProps {
  route: { params: { firstConnection: string } },
  navigation: NavigationType,
}

const EmailForm = ({ route, navigation }: EmailFormProps) => {
  const [behavior, setBehavior] = useState<'padding' | 'height'>('padding');
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const hardwareBackPress = useCallback(() => {
    if (!isLoading) setExitConfirmationModal(true);
    return true;
  }, [isLoading]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  useEffect(() => {
    if (Platform.OS === 'ios') setBehavior('padding');
    else setBehavior('height');
  }, []);

  useEffect(() => {
    setInvalidEmail(!email.match(EMAIL_REGEX));
    if (!email.match(EMAIL_REGEX) && isValidationAttempted) setErrorMessage('Votre e-mail n\'est pas valide');
    else setErrorMessage('');
  }, [email, isValidationAttempted]);

  const saveEmail = async () => {
    try {
      setIsValidationAttempted(true);
      setIsLoading(true);
      if (!invalidEmail) {
        if (error) setError(false);
        const isExistingUser = await Users.exists({ email });
        if (isExistingUser) await setForgotPasswordModal(true);
        else if (!route.params.firstConnection) {
          setInvalidEmail(true);
          setErrorMessage('Oups ! Cet e-mail n\'est pas reconnu.');
        } else navigation.navigate('CreateAccount', { email });
      }
    } catch (e) {
      setError(true);
      setErrorMessage('Oops, erreur lors de la vérification de l\'e-mail.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Authentication');
  };

  const enterEmail = text => setEmail(text.trim());

  const validationMessage = () => {
    if ((invalidEmail && isValidationAttempted) || error) return errorMessage;
    return '';
  };

  return (
    <KeyboardAvoidingView behavior={behavior} style={accountCreationStyles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      <View style={styles.goBack}>
        <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD} color={GREY[600]}
          disabled={isLoading} />
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title={'Êtes-vous sûr de cela ?'} contentText={'Vous reviendrez à la page d\'accueil.'} />
      </View>
      <View style={accountCreationStyles.container}>
        <Text style={accountCreationStyles.title}>Quel est votre e-mail ?</Text>
        <View style={accountCreationStyles.input}>
          <NiInput caption="E-mail" value={email} type="email" validationMessage={validationMessage()}
            onChangeText={text => enterEmail(text)} disabled={isLoading} />
        </View>
        <View style={accountCreationStyles.footer}>
          <NiButton caption="Valider" onPress={saveEmail} loading={isLoading} bgColor={PINK[500]}
            color={WHITE} borderColor={PINK[500]} />
        </View>
        <ForgotPasswordModal email={email} setForgotPasswordModal={setForgotPasswordModal}
          visible={forgotPasswordModal} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmailForm;
