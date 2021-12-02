import React, { useEffect, useRef, useState, useReducer } from 'react';
import {
  Text,
  ScrollView,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import FeatherButton from '../../../components/icons/FeatherButton';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import { GREY } from '../../../styles/colors';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../../styles/metrics';
import { UserType } from '../../../types/UserType';
import styles from './styles';
import NiInput from '../../../components/form/Input';
import { RootStackParamList, RootBottomTabParamList } from '../../../types/NavigationType';
import Users from '../../../api/users';
import { ActionType, ActionWithoutPayloadType } from '../../../types/store/StoreType';
import MainActions from '../../../store/main/actions';
import { EMAIL_REGEX, PHONE_REGEX } from '../../../core/data/constants';
import ExitModal from '../../../components/ExitModal';
import NiErrorMessage from '../../../components/ErrorMessage';
import { formatPhoneForPayload } from '../../../core/helpers/utils';
import PictureModal from '../../../components/PictureModal';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../../reducers/error';

interface ProfileEditionProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList>,
StackScreenProps<RootBottomTabParamList>
> {
  loggedUser: UserType,
  setLoggedUser: (user: UserType) => void,
}

const ProfileEdition = ({ loggedUser, navigation, setLoggedUser }: ProfileEditionProps) => {
  const isIOS = Platform.OS === 'ios';

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
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);
  const [source, setSource] = useState(require('../../../../assets/images/default_avatar.png'));
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [pictureModal, setPictureModal] = useState<boolean>(false);
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);

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
  }, []);

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
    if (lastName || phone || email || emptyEmail) {
      setIsValid(false);
    } else setIsValid(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unvalid]);

  const scrollRef = useRef<ScrollView>(null);

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Profile');
  };

  const saveData = async () => {
    try {
      setIsValidationAttempted(true);
      if (isValid) {
        setIsLoading(true);
        dispatchError({ type: RESET_ERROR });
        await Users.updateById(loggedUser._id, {
          ...editedUser,
          contact: { phone: formatPhoneForPayload(editedUser.contact.phone) },
        });
        const userId = loggedUser._id;
        const user = await Users.getById(userId);
        setLoggedUser(user);
        goBack();
      }
    } catch (e: any) {
      const payload = e.response.status === 409
        ? 'L\'email est déjà relié à un compte existant'
        : 'Erreur, si le problème persiste, contactez le support technique';
      dispatchError({ type: SET_ERROR, payload });
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeIdentity = (key, text) => {
    setEditedUser({
      ...editedUser,
      identity: { ...editedUser.identity, [key]: text },
    });
  };

  const emailValidation = () => {
    if (unvalid.email && isValidationAttempted) return 'Votre e-mail n\'est pas valide';
    if (unvalid.emptyEmail && isValidationAttempted) return 'Ce champ est obligatoire';

    return '';
  };

  return !!loggedUser && (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
      <View style={styles.goBack}>
        <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD}
          color={GREY[600]} />
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title="Êtes-vous sûr(e) de cela ?" contentText="Vos modifications ne seront pas enregistrées." />
      </View>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Modifier mes informations</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.profileImage} source={source} />
          <TouchableOpacity onPress={() => setPictureModal(true)}>
            <Text style={styles.profileEdit}>{hasPhoto ? 'MODIFIER LA PHOTO' : 'AJOUTER UNE PHOTO'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <NiInput caption="Prénom" value={editedUser.identity.firstname} type="firstname"
            onChangeText={text => onChangeIdentity('firstname', text)} />
        </View>
        <View style={styles.input}>
          <NiInput caption="Nom" value={editedUser.identity.lastname}
            type="lastname" onChangeText={text => onChangeIdentity('lastname', text)}
            validationMessage={unvalid.lastName && isValidationAttempted ? 'Ce champ est obligatoire' : ''} />
        </View>
        <View style={styles.input}>
          <NiInput caption="Téléphone" value={editedUser.contact.phone} type="phone"
            onChangeText={text => setEditedUser({ ...editedUser, contact: { phone: text } })}
            validationMessage={unvalid.phone && isValidationAttempted
              ? 'Votre numéro de téléphone n\'est pas valide'
              : ''} />
        </View>
        <View style={styles.input}>
          <NiInput caption="E-mail" value={editedUser.local.email} type="email" validationMessage={emailValidation()}
            onChangeText={text => setEditedUser({ ...editedUser, local: { email: text } })} />
        </View>
        <View style={styles.footer}>
          <NiErrorMessage message={error.message} show={error.value} />
          <NiPrimaryButton caption="Valider" onPress={saveData} loading={isLoading} />
        </View>
        <PictureModal visible={pictureModal} hasPhoto={hasPhoto} setPictureModal={setPictureModal} setSource={setSource}
          setHasPhoto={setHasPhoto} goBack={goBack} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdition);
