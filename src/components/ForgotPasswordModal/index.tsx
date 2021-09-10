import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import get from 'lodash/get';
import BottomModal from '../BottomModal';
import NiPrimaryButton from '../form/PrimaryButton';
import Authentication from '../../api/authentication';
import { EMAIL, MOBILE, PHONE } from '../../core/data/constants';
import { IS_LARGE_SCREEN } from '../../styles/metrics';
import styles from './styles';

interface ForgotPasswordModalProps {
  visible: boolean,
  email: string,
  setForgotPasswordModal: (value: boolean) => void,
}

const ForgotPasswordModal = ({ visible, email, setForgotPasswordModal }: ForgotPasswordModalProps) => {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const [invalidCode, setInvalidCode] = useState<boolean>(false);
  const inputRefs: any[] = [
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

  const keyboardDidHide = () => setIsKeyboardOpen(false);
  const keyboardDidShow = () => setIsKeyboardOpen(true);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
    };
  });

  useEffect(() => {
    const isCodeInvalid = !(code.every(char => char !== '' && Number.isInteger(Number(char))));
    setInvalidCode(isCodeInvalid);
    if (isCodeInvalid && isValidationAttempted) setErrorMessage('Le format du code est incorrect');
    else setErrorMessage('');
  }, [code, isValidationAttempted]);

  const onChangeText = (char, index) => {
    setCode(code.map((c, i) => (i === index ? char : c)));
    if (!!char && index + 1 < 4) inputRefs[index + 1].focus();
  };

  const goPreviousAfterEdit = (index) => {
    inputRefs[index].focus();
    if (code[index] !== '') onChangeText('', index);
  };

  const checkKeyValue = (key, idx) => {
    if (key === 'Backspace') {
      if (!idx && code[idx] === '') return;

      if (code[idx] === '') goPreviousAfterEdit(idx - 1);
      else onChangeText('', idx);
    }
  };

  const formatCode = () => {
    Keyboard.dismiss();
    const formattedCode = `${code[0]}${code[1]}${code[2]}${code[3]}`;
    setIsValidationAttempted(true);
    if (!invalidCode) sendCode(formattedCode);
  };

  const onRequestClose = () => {
    setCode(['', '', '', '']);
    setIsKeyboardOpen(false);
    setIsValidationAttempted(false);
    setInvalidCode(false);
    setErrorMessage('');
    setCodeRecipient('');
    setChosenMethod('');
    setForgotPasswordModal(false);
  };

  const sendCode = async (formattedCode) => {
    try {
      setIsLoading(true);
      const checkToken = await Authentication.passwordToken(email, formattedCode);
      onRequestClose();
      navigation.navigate('PasswordReset', { userId: checkToken.user._id, email, token: checkToken.token });
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
    } catch (e: any) {
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
    } catch (e: any) {
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
      <NiPrimaryButton caption='Recevoir le code par e-mail' customStyle={styles.button} onPress={sendEmail}
        loading={isLoading && chosenMethod === EMAIL} />
      <NiPrimaryButton caption='Recevoir le code par SMS' customStyle={styles.button} onPress={sendSMS}
        loading={isLoading && chosenMethod === PHONE} />
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
      <NiPrimaryButton caption='Valider' customStyle={styles.button} onPress={() => formatCode()} loading={isLoading} />
      {invalidCode && isValidationAttempted && <Text style={styles.unvalid}>{errorMessage}</Text>}
    </>
  );

  return (
    <BottomModal onRequestClose={onRequestClose} visible={visible}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Confirmez votre identité</Text>
        {!codeRecipient ? beforeCodeSent() : afterCodeSent()}
      </View>
    </BottomModal>
  );
};

export default ForgotPasswordModal;
