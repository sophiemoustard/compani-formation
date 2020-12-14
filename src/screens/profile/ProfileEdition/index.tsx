import React, { useEffect, useRef, useState, useContext } from 'react';
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
import NiErrorMessage from '../../../components/ErrorMessage';
import { formatPhoneForPayload } from '../../../core/helpers/utils';
import PictureModal from '../../../components/PictureModal';

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
  const [isLoadingForModal, setIsLoadingForModal] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [source, setSource] = useState(require('../../../../assets/images/default_avatar.png'));
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [pictureModal, setPictureModal] = useState<boolean>(false);

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

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  useEffect(() => {
    if (loggedUser?.picture?.link) {
      setSource({ uri: loggedUser.picture.link });
      setHasPhoto(true);
    } else {
      setSource(require('../../../../assets/images/default_avatar.png'));
      setHasPhoto(false);
    }
  }, [loggedUser]);

  const TakePicture = () => {
    if (pictureModal) setPictureModal(false);
    navigation.navigate('Camera');
  };

  const addPictureFromGallery = () => {
    if (pictureModal) setPictureModal(false);
  };

  const DeletePicture = async () => {
    try {
      setIsLoadingForModal(true);
      await Users.deleteImage(loggedUser._id);
      const user = await Users.getById(loggedUser._id);
      setLoggedUser(user);
      if (pictureModal) setPictureModal(false);
      goBack();
    } catch (e) {
      console.error('error is', e);
    } finally {
      setIsLoadingForModal(false);
    }
  };

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
      setError(false);
      setErrorMessage('');
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
      else if (e.status === 409) setErrorMessage('L\'email est déjà relié à un utilisateur existant');
      else setErrorMessage('Erreur, si le problème persiste, contactez le support technique.');
      setError(true);
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
    if (unvalid.email) return 'Ton adresse e-mail n\'est pas valide';
    if (unvalid.emptyEmail) return 'Ce champ est obligatoire';

    return '';
  };

  return !!loggedUser && (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
      <View style={styles.goBack}>
        <IconButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD} color={GREY[600]} />
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title='Es-tu sûr de cela ?' contentText='Tes modifications ne seront pas enregistrées.' />
      </View>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Modifier mes informations</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.profileImage} source={source} />
          <TouchableOpacity onPress={() => setPictureModal(true)}>
            <Text style={styles.profileEdit}>{hasPhoto ? 'MODIFIIER LA PHOTO' : 'AJOUTER UNE PHOTO'}</Text>
          </TouchableOpacity>
        </View>
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
          <NiErrorMessage message={errorMessage} show={error} />
          <NiButton caption="Valider" onPress={saveData} disabled={!isValid} loading={isLoading}
            bgColor={isValid ? PINK[500] : GREY[500]} color={WHITE} borderColor={isValid ? PINK[500] : GREY[500]} />
        </View>
        <PictureModal visible={pictureModal} isLoading={isLoadingForModal} hasPhoto={hasPhoto}
          setPictureModal={setPictureModal} TakePicture={TakePicture} addPictureFromGallery={addPictureFromGallery}
          DeletePicture={DeletePicture} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdition);
