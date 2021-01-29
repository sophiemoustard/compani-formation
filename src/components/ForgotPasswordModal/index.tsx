import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TextInput, Keyboard, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import get from 'lodash/get';
import NiButton from '../form/Button';
import FeatherButton from '../icons/FeatherButton';
import Authentication from '../../api/authentication';
import { EMAIL, MOBILE, PHONE } from '../../core/data/constants';
import { ICON, IS_LARGE_SCREEN } from '../../styles/metrics';
import { GREY, PINK, WHITE } from '../../styles/colors';
import styles from './styles';

interface ForgotPasswordModalProps {
  email: string,
  onRequestClose: () => void,
}

const ForgotPasswordModal = ({ email, onRequestClose }: ForgotPasswordModalProps) => {
  const [code, setCode] = useState<Array<string>>(['', '', '', '']);
  const [previousIndex, setPreviousIndex] = useState<number>(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const [invalidCode, setInvalidCode] = useState<boolean>(false);
  const inputRefs: Array<any> = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [codeRecipient, setCodeRecipient] = useState<string>('');
  const [chosenMethod, setChosenMethod] = useState<string>('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));
    return () => {
      Keyboard.removeListener('keyboardDidHide', () => setIsKeyboardOpen(false));
    };
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    };
  }, []);

  useEffect(() => {
    setInvalidCode(!(code.every(char => char !== '' && Number.isInteger(Number(char)))));
    if (isValidationAttempted) setErrorMessage('Le format du code est incorrect');
  }, [code, isValidationAttempted]);

  const onChangeText = (char, index) => {
    setCode(code.map((c, i) => (i === index ? char : c)));
    setPreviousIndex(index);
    if (!!char && index + 1 < 4) inputRefs[index + 1].focus();
  };

  const goPreviousAfterEdit = (index) => {
    if (index - 1 >= 0 && (previousIndex === index && !code[index])) {
      inputRefs[index - 1].focus();
      if (code[index] === '') onChangeText('', index - 1);
    }
  };

  const checkKeyValue = (key, idx) => {
    if (key === 'Backspace' && (previousIndex === idx)) goPreviousAfterEdit(idx);
  };

  const formatCode = () => {
    Keyboard.dismiss();
    const formattedCode = `${code[0]}${code[1]}${code[2]}${code[3]}`;
    setIsValidationAttempted(true);
    if (!invalidCode) sendCode(formattedCode);
  };

  const sendCode = async (formattedCode) => {
    try {
      setIsLoading(true);
      const checkToken = await Authentication.passwordToken(email, formattedCode);
      navigation.navigate('PasswordReset', { userId: checkToken.user._id, email, token: checkToken.token });
      onRequestClose();
    } catch (e) {
      setInvalidCode(true);
      setErrorMessage('Oops, le code n\'est pas valide');
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      setIsLoading(true);
      setChosenMethod(EMAIL);
      await Authentication.forgotPassword({ email, origin: MOBILE, type: EMAIL });
      setCodeRecipient(email);
      setInvalidCode(false);
    } catch (e) {
      setInvalidCode(true);
      if (e.response.status === 404) setErrorMessage('Oops, on ne reconnaît pas cet e-mail');
      else setErrorMessage('Oops, erreur lors de la transmission de l\'e-mail.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendSMS = async () => {
    try {
      setIsLoading(true);
      setChosenMethod(PHONE);
      const sms = await Authentication.forgotPassword({ email, origin: MOBILE, type: PHONE });
      setCodeRecipient(get(sms, 'phone'));
      setInvalidCode(false);
    } catch (e) {
      setInvalidCode(true);
      if (e.response.status === 409) {
        setErrorMessage('Oops, nous n\'avons pas trouvé de numéro de téléphone associé à votre compte');
      } else setErrorMessage('Oops, erreur lors de la transmission du numéro de téléphone.');
    } finally {
      setIsLoading(false);
    }
  };

  const beforeCodeSent = () => (
    <>
      <Text style={styles.beforeCodeSentText}>
        Pour réinitialiser votre mot de passe, vous devez d’abord confirmer votre identité par un code temporaire.
      </Text>
      <NiButton caption='Recevoir le code par e-mail' style={styles.button} onPress={sendEmail}
        loading={isLoading && chosenMethod === EMAIL} bgColor={PINK[500]} borderColor={PINK[500]} color={WHITE} />
      <NiButton caption='Recevoir le code par SMS' style={styles.button} onPress={sendSMS}
        loading={isLoading && chosenMethod === PHONE} bgColor={PINK[500]} borderColor={PINK[500]} color={WHITE} />
      <Text style={styles.unvalid}>{errorMessage}</Text>
    </>);

  const afterCodeSent = () => (
    <>
      {(IS_LARGE_SCREEN || !isKeyboardOpen) &&
        <>
          {chosenMethod === EMAIL
            ? <Text style={styles.afterCodeSentText}>
              Nous avons envoyé un e-mail à<Text style={styles.recipient}> {codeRecipient} </Text>
              avec le code temporaire. Si vous ne l’avez pas reçu, vérifiez votre courrier indésirable, ou réessayez.
            </Text>
            : <Text style={styles.afterCodeSentText}>
              Nous avons envoyé un SMS au
              <Text style={styles.recipient}> {codeRecipient.replace(/\d{2}(?=.)/g, '$& ')} </Text>
              avec le code temporaire.
            </Text>}
          <Text style={styles.afterCodeSentText}>Saisie du code temporaire</Text>
        </>}
      <View style={styles.inputContainer}>
        {inputRefs.map((k, idx) => (
          <TextInput ref={(r) => { inputRefs[idx] = r; }} key={`${k}${idx}`} value={code[idx]}
            onChangeText={char => onChangeText(char, idx)} style={styles.input} placeholder={'_'}
            onKeyPress={({ nativeEvent }) => checkKeyValue(nativeEvent.key, idx)}
            maxLength={1} keyboardType={'number-pad'} autoFocus={idx === 0} />))}
      </View>
      <NiButton caption='Valider' style={styles.button} onPress={() => formatCode()}
        loading={isLoading} bgColor={PINK[500]} borderColor={PINK[500]} color={WHITE} />
      {invalidCode && isValidationAttempted && <Text style={styles.unvalid}>{errorMessage}</Text>}
    </>
  );

  return (
    <Modal transparent={true} onRequestClose={onRequestClose}>
      <ScrollView contentContainerStyle={styles.modalContainer} keyboardShouldPersistTaps='handled'>
        <View style={styles.modalContent}>
          <FeatherButton name={'x-circle'} onPress={onRequestClose} size={ICON.LG} color={GREY[600]}
            style={styles.goBack} />
          <Text style={styles.title}>Confirmez votre identité</Text>
          {!codeRecipient ? beforeCodeSent() : afterCodeSent()}
        </View>
      </ScrollView>
    </Modal>);
};

export default ForgotPasswordModal;
