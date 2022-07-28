import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import NiModal from '../Modal';
import NiPrimaryButton from '../form/PrimaryButton';
import FeatherButton from '../icons/FeatherButton';
import { ICON } from '../../styles/metrics';
import { PINK, WHITE } from '../../styles/colors';
import styles from './styles';
import { UserType } from '../../types/UserType';
import Users from '../../api/users';
import { ActionType, ActionWithoutPayloadType } from '../../types/store/StoreType';
import MainActions from '../../store/main/actions';

interface PictureModalProps {
  visible: boolean,
  hasPhoto: boolean,
  loggedUser: UserType
  setPictureModal: (value) => void,
  setSource: (value) => void,
  setHasPhoto: (value) => void,
  setLoggedUser: (user: UserType) => void,
  goBack?: () => void,
}

const PictureModal = ({
  visible,
  hasPhoto,
  loggedUser,
  setPictureModal,
  setSource,
  setHasPhoto,
  setLoggedUser,
  goBack,
}: PictureModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const alert = (component) => {
    Alert.alert(
      'Accès refusé',
      `Vérifie que l'application a bien l'autorisation d'accéder à  ${component}`,
      [{ text: 'OK', onPress: () => setPictureModal(false) }],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (loggedUser?.picture?.link) {
      setSource({ uri: loggedUser.picture.link });
      setHasPhoto(true);
    } else {
      setSource(require('../../../assets/images/default_avatar.png'));
      setHasPhoto(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  const requestPermissionsForCamera = async () => {
    try {
      setIsLoading(true);
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') navigation.navigate('Camera');
      else alert('l\'appareil photo');
    } catch {
      setPictureModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  const takePicture = () => {
    setPictureModal(false);
    requestPermissionsForCamera();
  };

  const requestPermissionsForImagePicker = async () => {
    try {
      setIsLoading(true);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') navigation.navigate('ImagePickerManager');
      else alert('la galerie');
    } catch {
      if (goBack) goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const addPictureFromGallery = () => {
    setPictureModal(false);
    requestPermissionsForImagePicker();
  };

  const deletePicture = async () => {
    try {
      setIsLoading(true);
      await Users.deleteImage(loggedUser._id);
      const user = await Users.getById(loggedUser._id);
      setLoggedUser(user);
      setPictureModal(false);
      if (goBack) goBack();
    } catch (e) {
      Alert.alert(
        'Echec de la suppression',
        'Réessaie plus tard',
        [{ text: 'OK', onPress: () => setPictureModal(false) }],
        { cancelable: false }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NiModal visible={visible} onRequestClose={() => setPictureModal(false)}>
      <FeatherButton name={'x-circle'} onPress={() => setPictureModal(false)} size={ICON.LG} color={PINK[500]}
        style={styles.goBack} />
      <NiPrimaryButton caption='Prendre une photo' customStyle={styles.button} onPress={takePicture}
        disabled={isLoading} bgColor={WHITE} color={PINK[500]} />
      <NiPrimaryButton caption='Ajouter une photo' customStyle={styles.button} onPress={addPictureFromGallery}
        disabled={isLoading} bgColor={WHITE} color={PINK[500]} />
      {hasPhoto &&
        <NiPrimaryButton caption='Supprimer la photo' customStyle={styles.button} onPress={deletePicture}
          disabled={isLoading} bgColor={WHITE} color={PINK[500]} loading={isLoading} />}
    </NiModal>);
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureModal);
