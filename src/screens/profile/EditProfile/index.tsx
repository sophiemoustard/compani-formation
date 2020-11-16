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
import pick from 'lodash/pick';
import IconButton from '../../../components/IconButton';
import NiButton from '../../../components/form/Button';
import asyncStorage from '../../../core/helpers/asyncStorage';
import { GREY, PINK, WHITE } from '../../../styles/colors';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../../styles/metrics';
import { UserType } from '../../../types/UserType';
import styles from './styles';
import NiInput from '../../../components/form/Input';
import { NavigationType } from '../../../types/NavigationType';
import ExitProfileModal from '../ExitProfileModal';
import Users from '../../../api/users';
import { ActionType, ActionWithoutPayloadType } from '../../../types/store/StoreType';
import MainActions from '../../../store/main/actions';
import { Context as AuthContext } from '../../../context/AuthContext';

interface EditProfileProps {
  loggedUser: UserType,
  navigation: NavigationType,
  setLoggedUser: (user: UserType) => void,
}

const EditProfile = ({ loggedUser, navigation, setLoggedUser }: EditProfileProps) => {
  const isIOS = Platform.OS === 'ios';
  const { signOut } = useContext(AuthContext);
  const inputStyle = { borderColor: GREY[600] };

  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<any>({
    identity: {
      firstname: loggedUser.identity.firstname,
      lastname: loggedUser.identity.lastname,
    },
    contact: {
      phone: loggedUser.contact?.phone || '',
    },
    local: {
      email: loggedUser.local.email,
    },
  });
  const [unvalid, setUnvalid] = useState({ lastName: false, phone: false, email: false, emptyEmail: false });
  const [isValid, setIsValid] = useState<boolean>(false);

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
      phone: !editedUser.contact.phone.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/) &&
      editedUser.contact.phone.length > 0,
      email: !editedUser.local.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) && editedUser.local.email.length > 0,
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
      if (isValid) await Users.updateById(loggedUser._id, editedUser);
      const userId = await asyncStorage.getUserId();
      const user = await Users.getById(userId);
      setLoggedUser(pick(user, [
        '_id',
        'identity.firstname',
        'identity.lastname',
        'local.email',
        'picture.link',
        'company.name',
        'contact.phone',
      ]));
      goBack();
    } catch (e) {
      if (e.status === 401) signOut();
    }
  };

  return !!loggedUser && (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      <View style={styles.goBack}>
        <TouchableOpacity>
          <IconButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD} color={GREY[600]} />
        </TouchableOpacity>
        <ExitProfileModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)} />
      </View>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Modifier mes informations</Text>
        <View style={styles.input}>
          <NiInput caption="Prénom" value={editedUser.identity.firstname} customStyle={inputStyle} type="firstname" darkMode={false}
            onChangeText={text => setEditedUser({
              ...editedUser,
              identity: { firstname: text, lastname: editedUser.identity.lastname },
            })} />
        </View>
        <View style={styles.input}>
          <NiInput caption="Nom" value={editedUser.identity.lastname} customStyle={inputStyle} type="lastname" darkMode={false}
            onChangeText={text => setEditedUser({
              ...editedUser,
              identity: { firstname: editedUser.identity.firstname, lastname: text },
            })} />
          <Text style={styles.unvalid}>{unvalid.lastName && 'Ce champ est obligatoire'}</Text>
        </View>
        <View style={styles.input}>
          <NiInput caption="Téléphone" value={editedUser.contact.phone} customStyle={inputStyle} type="phone" darkMode={false}
            onChangeText={text => setEditedUser({ ...editedUser, contact: { phone: text } })} />
          <Text style={styles.unvalid}>{unvalid.phone && 'Ton numéro de téléphone n\'est pas valide'}</Text>
        </View>
        <View style={styles.input}>
          <NiInput caption="E-mail" value={editedUser.local.email} customStyle={inputStyle}  type="email" darkMode={false}
            onChangeText={text => setEditedUser({ ...editedUser, local: { email: text } })} />
          <Text style={styles.unvalid}>{unvalid.email && 'Ton adresse e-mail n\'est pas valide'}</Text>
          <Text style={styles.unvalid}>{unvalid.emptyEmail && 'Ce champ est obligatoire'}</Text>
        </View>
        <View style={styles.validate}>
          <NiButton caption="Valider" onPress={saveData} disabled={!isValid}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
