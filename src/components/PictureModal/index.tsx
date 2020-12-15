import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { navigate } from '../../navigationRef';
import NiModal from '../Modal';
import NiButton from '../form/Button';
import IconButton from '../IconButton';
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

  const TakePicture = () => {
    setPictureModal(false);
    navigate('Camera');
  };

  const addPictureFromGallery = () => {
    setPictureModal(false);
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
        [{ text: 'OK', onPress: () => navigate('Camera') }], { cancelable: false }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NiModal visible={visible} onRequestClose={() => setPictureModal(false)}>
      <IconButton name={'x-circle'} onPress={() => setPictureModal(false)} size={ICON.LG} color={PINK[500]}
        style={styles.goBack} />
      <NiButton caption='Prendre une photo' style={styles.button} onPress={TakePicture} disabled={isLoading}
        bgColor={WHITE} borderColor={WHITE} color={PINK[500]} />
      <NiButton caption='Ajouter une photo' style={styles.button} onPress={addPictureFromGallery} disabled={isLoading}
        bgColor={WHITE} borderColor={WHITE} color={PINK[500]} />
      {hasPhoto &&
        <NiButton caption='Supprimer la photo' style={styles.button} onPress={deletePicture} disabled={isLoading}
          bgColor={WHITE} borderColor={WHITE} color={PINK[500]} loading={isLoading} />}
    </NiModal>);
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureModal);
