import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import IconButton from '../../../components/IconButton';
import NiButton from '../../../components/form/Button';
import { GREY, PINK, WHITE } from '../../../styles/colors';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../../styles/metrics';
import { UserType } from '../../../types/UserType';
import styles from './styles';
import NiInput from '../../../components/form/Input';
import { NavigationType } from '../../../types/NavigationType';
import Users from '../../../api/users';
import { ActionType, ActionWithoutPayloadType } from '../../../types/store/StoreType';
import MainActions from '../../../store/main/actions';
import { Context as AuthContext } from '../../../context/AuthContext';
import { EMAIL_REGEX, PHONE_REGEX } from '../../../core/data/constants';
import ExitModal from '../../../components/ExitModal';
import { formatPhoneForPayload } from '../../../core/helpers/utils';

interface ProfileEditionProps {
  loggedUser: UserType,
  navigation: NavigationType,
  setLoggedUser: (user: UserType) => void,
}

const ProfileEdition = ({ loggedUser, navigation, setLoggedUser }: ProfileEditionProps) => {
  const isIOS = Platform.OS === 'ios';
  const { signOut } = useContext(AuthContext);

  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<any>({
    identity: {
      firstname: loggedUser.identity.firstname,
      lastname: loggedUser.identity.lastname,
    },
    contact: { phone: loggedUser.contact?.phone || '' },
    local: { email: loggedUser.local.email },
  });
  const [unvalid, setUnvalid] = useState({ lastName: false, phone: false, email: false, emptyEmail: false });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const keyboardDidHide = () => Keyboard.dismiss();
  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  const hardwareBackPress = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  useEffect(() => {
    setUnvalid({
      lastName: editedUser.identity.lastname === '',
      phone: !editedUser.contact.phone.match(PHONE_REGEX) && editedUser.contact.phone.length > 0,
      email: !editedUser.local.email.match(EMAIL_REGEX) && editedUser.local.email.length > 0,
      emptyEmail: editedUser.local.email === '',
    });
  }, [editedUser]);

  useEffect(() => {
    const { lastName, phone, email, emptyEmail } = unvalid;
    if (lastName || phone || email || emptyEmail ||
      (editedUser.identity.firstname === loggedUser.identity.firstname &&
        editedUser.identity.lastname === loggedUser.identity.lastname &&
        editedUser.contact.phone === loggedUser.contact?.phone &&
        editedUser.local.email === loggedUser.local.email)) {
      setIsValid(false);
    } else setIsValid(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unvalid]);

  const scrollRef = useRef<ScrollView>(null);

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Home', { screen: 'Profile', params: { screen: 'Profile' } });
  };

  const saveData = async () => {
    try {
      setIsLoading(true);
      if (isValid) {
        await Users.updateById(loggedUser._id, {
          ...editedUser,
          contact: { phone: formatPhoneForPayload(editedUser.contact.phone) },
        });
      }
      const userId = loggedUser._id;
      const user = await Users.getById(userId);
      setLoggedUser(user);
      goBack();
    } catch (e) {
      if (e.status === 401) signOut();
    }
  };

  const onChangeIdentity = (key, text) => {
    setEditedUser({
      ...editedUser,
      identity: { ...editedUser.identity, [key]: text },
    });
  };

  const emailValidation = () => {
    if (unvalid.email) return 'Ton adresse e-mail n\'est pas valide';
    if (unvalid.emptyEmail) return 'Ce champ est obligatoire';

    return '';
  };

  return !!loggedUser && (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
      <View style={styles.goBack}>
        <TouchableOpacity>
          <IconButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD} color={GREY[600]} />
        </TouchableOpacity>
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title='Es-tu sûr de cela ?' contentText='Tes modifications ne seront pas enregistrées.' />
      </View>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Modifier mes informations</Text>
        <View style={styles.input}>
          <NiInput caption="Prénom" value={editedUser.identity.firstname}
            type="firstname" darkMode={false} onChangeText={text => onChangeIdentity('firstname', text)} />
        </View>
        <View style={styles.input}>
          <NiInput caption="Nom" value={editedUser.identity.lastname}
            type="lastname" darkMode={false} onChangeText={text => onChangeIdentity('lastname', text)}
            validationMessage={unvalid.lastName ? 'Ce champ est obligatoire' : ''} />
        </View>
        <View style={styles.input}>
          <NiInput caption="Téléphone" value={editedUser.contact.phone} type="phone"
            darkMode={false} onChangeText={text => setEditedUser({ ...editedUser, contact: { phone: text } })}
            validationMessage={unvalid.phone ? 'Ton numéro de téléphone n\'est pas valide' : ''} />
        </View>
        <View style={styles.input}>
          <NiInput caption="E-mail" value={editedUser.local.email} type="email"
            darkMode={false} onChangeText={text => setEditedUser({ ...editedUser, local: { email: text } })}
            validationMessage={emailValidation()} />
        </View>
        <View style={styles.footer}>
          <NiButton caption="Valider" onPress={saveData} disabled={!isValid} loading={isLoading}
            bgColor={isValid ? PINK[500] : GREY[500]} color={WHITE} borderColor={isValid ? PINK[500] : GREY[500]} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdition);
