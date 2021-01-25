import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TextInput, Keyboard, ScrollView } from 'react-native';
import NiButton from '../form/Button';
import FeatherButton from '../icons/FeatherButton';
import { ICON, IS_LARGE_SCREEN } from '../../styles/metrics';
import { GREY, PINK, WHITE } from '../../styles/colors';
import styles from './styles';

interface ForgotPasswordModalProps {
  visible: boolean,
  isLoading: boolean,
  errorMessage: string,
  codeRecipient: string,
  onRequestClose: () => void,
  sendEmail: () => void,
  sendCode: (code: string) => void,
}

const ForgotPasswordModal = ({
  visible,
  isLoading,
  errorMessage,
  codeRecipient,
  onRequestClose,
  sendEmail,
  sendCode,
}: ForgotPasswordModalProps) => {
  const [code, setCode] = useState<Array<string>>(['', '', '', '']);
  const [isPreviousKeyBackSpace, setIsPreviousKeyBackSpace] = useState<boolean>(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const [unvalidCode, setUnvalidCode] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const inputRefs: Array<any> = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));
    return () => {
      Keyboard.removeListener('keyboardDidHide', () => setIsKeyboardOpen(false));
    };
  });

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    };
  });

  useEffect(() => {
    const formattedCode = Number(`${code[0]}${code[1]}${code[2]}${code[3]}`);
    setUnvalidCode(!(code.every(char => char !== '') && formattedCode));
  }, [code]);

  useEffect(() => { setIsValid(!unvalidCode); }, [unvalidCode]);

  const goNextAfterEdit = (index) => {
    if (index + 1 < 4) inputRefs[index + 1].focus();
  };

  const goPreviousAfterEdit = (index) => {
    if (index - 1 >= 0) {
      inputRefs[index - 1].focus();
      if (code[index] === '') onChangeText('', index - 1);
    }
  };

  const checkKeyValue = (key, idx) => {
    if (key === 'Backspace' && (isPreviousKeyBackSpace || !code[idx])) goPreviousAfterEdit(idx);
    if (key === 'Backspace') setIsPreviousKeyBackSpace(true);
    else setIsPreviousKeyBackSpace(false);
  };

  const onChangeText = (char, index) => {
    setCode(code.map((c, i) => (i === index ? char : c)));
    if (char !== '') goNextAfterEdit(index);
  };

  const formatCode = () => {
    Keyboard.dismiss();
    const formattedCode = `${code[0]}${code[1]}${code[2]}${code[3]}`;
    setIsValidationAttempted(true);
    if (isValid) sendCode(formattedCode);
  };

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
      <ScrollView contentContainerStyle={styles.modalContainer} keyboardShouldPersistTaps='handled'>
        <View style={styles.modalContent}>
          <FeatherButton name={'x-circle'} onPress={onRequestClose} size={ICON.LG} color={GREY[600]}
            style={styles.goBack} />
          <Text style={styles.title}>Confirmez votre identité</Text>
          { !codeRecipient
            ? <>
              <Text style={styles.beforeCodeSentText}>
                Pour réinitialiser votre mot de passe, vous devez d’abord confirmer
                votre identité par un code temporaire.
              </Text>
              <NiButton caption='Recevoir le code par e-mail' style={styles.button} onPress={sendEmail}
                loading={isLoading} bgColor={PINK[500]} borderColor={PINK[500]} color={WHITE} />
              <Text style={styles.unvalid}>{errorMessage}</Text>
            </>
            : <>
              {(IS_LARGE_SCREEN || !isKeyboardOpen) &&
                <Text style={styles.afterCodeSentText }>
                  Nous avons envoyé un e-mail à<Text style={styles.recipient}> {codeRecipient} </Text>
                  avec le code temporaire. Si vous ne l’avez pas reçu, vérifiez votre courrier indésirable,
                  ou réessayez.
                </Text>}
              {(IS_LARGE_SCREEN || !isKeyboardOpen) &&
              <Text style={styles.afterCodeSentText}>Saisie du code temporaire</Text>}
              <View style={styles.inputContainer}>
                {inputRefs.map((k, idx) => (
                  <TextInput ref={(r) => { inputRefs[idx] = r; }} key={`${k}${idx}`} value={code[idx]}
                    onChangeText={char => onChangeText(char, idx)} style={styles.input} placeholder={'_'}
                    onKeyPress={({ nativeEvent }) => checkKeyValue(nativeEvent.key, idx)}
                    maxLength={1} keyboardType={'number-pad'} autoFocus={idx === 0} />
                ))
                }
              </View>
              <NiButton caption='Valider' style={styles.button} onPress={() => formatCode()}
                loading={isLoading} bgColor={PINK[500]} borderColor={PINK[500]} color={WHITE} />
              {!isValid && isValidationAttempted && <Text style={styles.unvalid}>Le format du code est incorrect</Text>}
              <Text style={styles.unvalid}>{errorMessage}</Text>
            </>}
        </View>
      </ScrollView>
    </Modal>);
};

export default ForgotPasswordModal;
