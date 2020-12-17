import React, { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import ExitModal from '../../components/ExitModal';
import IconButton from '../../components/IconButton';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../styles/metrics';
import { NavigationType } from '../../types/NavigationType';
import NiInput from '../../components/form/Input';
import NiButton from '../../components/form/Button';
import styles from './styles';
import { GREY, PINK, WHITE } from '../../styles/colors';
import { EMAIL_REGEX } from '../../core/data/constants';
import BottomPopUp from '../../components/BottomPopUp';
import Users from '../../api/users';
import Authentication from '../../api/authentication';

interface EmailFormProps {
  route: { params: { firstConnection: string } },
  navigation: NavigationType,
}

const EmailForm = ({ route, navigation }: EmailFormProps) => {
  const isIOS = Platform.OS === 'ios';
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [unvalidEmail, setUnvalidEmail] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);
  const [isBottomPopUpVisible, setIsBottomPopUpVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const style = styles(isKeyboardOpen && !IS_LARGE_SCREEN);

  const hardwareBackPress = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  useEffect(() => { setUnvalidEmail(!email.match(EMAIL_REGEX)); }, [email]);

  useEffect(() => { setIsValid(!unvalidEmail); }, [unvalidEmail]);

  const sendEmail = async () => {
    try {
      await Authentication.forgotPassword({ email });
      setIsBottomPopUpVisible(true);
    } catch (e) {
      setError(true);
      if (e.response.status === 404) setErrorMessage('Oops, on ne reconnaît pas cette adresse mail');
      else setErrorMessage('Oops, erreur lors de la transmission de l\'adresse mail.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveEmail = async () => {
    try {
      setIsLoading(true);
      if (isValid) {
        if (error) setError(false);
        if (!route.params.firstConnection) await sendEmail();
        else {
          const isExistingUser = await Users.exists({ email });
          if (isExistingUser) await sendEmail();
          else navigation.navigate('CreateAccount', { email });
        }
      }
    } catch (e) {
      setError(true);
      setErrorMessage('Oops, erreur lors de l\'envoi de l\'adresse.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Authentication');
  };

  const enterEmail = (text) => {
    setErrorMessage('');
    setEmail(text);
    setIsTouch(true);
  };

  const confirm = () => {
    goBack();
    setIsBottomPopUpVisible(false);
  };

  const validationMessage = () => {
    if (unvalidEmail && isTouch) return 'Ton adresse e-mail n\'est pas valide';
    if (error) return errorMessage;
    return '';
  };

  const renderContentText = () =>
    <Text style={style.contentText}>Nous avons envoyé un e-mail à<Text style={style.email}>{` ${email}`}</Text>
    . Si tu ne l’as pas reçu, vérifie ton Courrier indésirable, ou réessaie.</Text>;

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={style.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      <View style={style.goBack}>
        <IconButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD} color={GREY[600]} />
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title={'Es-tu sûr de cela ?'} contentText={'Tu reviendras à la page d\'accueil.'} />
      </View>
      <View style={style.container}>
        <Text style={style.title}>Quelle est ton adresse mail ?</Text>
        <View style={style.input}>
          <NiInput caption="E-mail" value={email} type="email" validationMessage={validationMessage()} darkMode={false}
            onChangeText={text => enterEmail(text)} isKeyboardOpen={setIsKeyboardOpen} />
        </View>
        <View style={style.footer}>
          <NiButton caption="Valider" onPress={saveEmail} disabled={!isValid} loading={isLoading}
            bgColor={isValid ? PINK[500] : GREY[500]} color={WHITE} borderColor={isValid ? PINK[500] : GREY[500]} />
        </View>
        <BottomPopUp onPressConfirmButton={confirm} visible={isBottomPopUpVisible}
          title='Vérifie tes e-mails !' contentText={renderContentText} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmailForm;
