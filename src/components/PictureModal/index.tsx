import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import NiModal from '../Modal';
import IconButton from '../IconButton';
import { ICON } from '../../styles/metrics';
import { GREY, PINK } from '../../styles/colors';
import commonStyles from '../../styles/common';
import styles from './styles';

interface PictureModalProps {
  visible: boolean,
  isLoading: boolean,
  hasPhoto: boolean,
  setPictureModal: (value) => void,
  TakePicture: () => void,
  addPictureFromGallery: () => void,
  DeletePicture: () => void,
}

const PictureModal = ({
  visible,
  isLoading,
  hasPhoto,
  setPictureModal,
  TakePicture,
  addPictureFromGallery,
  DeletePicture,
}: PictureModalProps) => (
  <NiModal visible={visible} onRequestClose={() => setPictureModal(false)}>
    <IconButton name={'x-circle'} onPress={() => setPictureModal(false)} size={ICON.LG} color={PINK[500]}
      style={styles.goBack} />
    <TouchableOpacity style={styles.button} onPress={TakePicture} disabled={isLoading}>
      <Text style={styles.buttonText}>Prendre une photo</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={addPictureFromGallery} disabled={isLoading}>
      <Text style={styles.buttonText}>Ajouter une photo</Text>
    </TouchableOpacity>
    {hasPhoto &&
    <TouchableOpacity style={styles.button} onPress={DeletePicture} disabled={isLoading}>
      <Text style={styles.buttonText}>Supprimer la photo</Text>
      {isLoading &&
        <ActivityIndicator style={[commonStyles.disabled, styles.loading]} color={GREY[200]} size="small" />
      }
    </TouchableOpacity>}
  </NiModal>
);

export default PictureModal;
