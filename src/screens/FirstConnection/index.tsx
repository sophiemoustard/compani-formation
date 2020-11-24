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
import ExitModal from '../../components/ExitModal';
import IconButton from '../../components/IconButton';
import { Context as AuthContext } from '../../context/AuthContext';
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

interface FirstConnectionProps {
  navigation: NavigationType,
}

const FirstConnection = ({ navigation }: FirstConnectionProps) => {
  const isIOS = Platform.OS === 'ios';
  const { signOut } = useContext(AuthContext);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [unvalidEmail, setUnvalidEmail] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);
  const [isBottomPopUpVisible, setIsBottomPopUpVisible] = useState<boolean>(false);

  const keyboardDidHide = () => Keyboard.dismiss();
  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

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
      setIsLoading(false);
    } catch (e) {
      if (e.status === 401) signOut();
    }
  };

  const saveEmail = async () => {
    try {
      setIsLoading(true);
      if (isValid) {
        const isExistingUser = await Users.exists({ email });
        if (isExistingUser) sendEmail();
        else goBack();
      }
    } catch (e) {
      if (e.status === 401) signOut();
    }
  };

  const scrollRef = useRef<ScrollView>(null);

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Authentication');
  };

  const enterEmail = (text) => {
    setEmail(text);
    setIsTouch(true);
  };

  const confirm = () => {
    goBack();
    setIsBottomPopUpVisible(false);
  };

  const renderContentText = () =>
    <Text style={styles.contentText}>Nous avons envoyé un e-mail à<Text style={styles.email}>{` ${email}`}</Text>
    . Si tu ne l’as pas reçu, vérifie ton Courrier indésirable, ou réessaie.</Text>;

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      <View style={styles.goBack}>
        <IconButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD} color={GREY[600]} />
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title={'Es-tu sûr de cela ?'} contentText={'Tu reviendras à la page d\'accueil.'} />
      </View>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Quelle est ton adresse email ?</Text>
        <View style={styles.input}>
          <NiInput caption="E-mail" value={email} type="email"
            darkMode={false} onChangeText={text => enterEmail(text)}
            validationMessage={unvalidEmail && isTouch ? 'Ton adresse e-mail n\'est pas valide' : ''} />
        </View>
        <View style={styles.footer}>
          <NiButton caption="Valider" onPress={saveEmail} disabled={!isValid} loading={isLoading}
            bgColor={isValid ? PINK[500] : GREY[500]} color={WHITE} borderColor={isValid ? PINK[500] : GREY[500]} />
        </View>
        <BottomPopUp onPressConfirmButton={confirm} visible={isBottomPopUpVisible}
          title='Vérifie tes e-mails !' contentText={renderContentText} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FirstConnection;
