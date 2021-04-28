import React from 'react';
import { View, ImageBackground } from 'react-native';
import { GREY, WHITE } from '../../../styles/colors';
import NiPrimaryButton from '../../form/PrimaryButton';
import NiButton from '../../form/Button';
import styles from './style';

interface NiCameraPreviewProps {
  photo: any,
  loading: boolean,
  onSavePhoto: (photo) => void,
  onRetakePicture: () => void,
}

const NiCameraPreview = ({ photo, loading, onSavePhoto, onRetakePicture }: NiCameraPreviewProps) => (
  <View style={styles.container}>
    <ImageBackground source={{ uri: photo && photo.uri }} style={styles.photo}>
      <View style={styles.buttonContainer}>
        <NiPrimaryButton caption='Enregistrer la photo' onPress={() => onSavePhoto(photo)} loading={loading}
          disabled={loading} style={styles.button} />
        <NiButton caption='Reprendre la photo' onPress={onRetakePicture} disabled={loading}
          style={styles.button} bgColor={WHITE} color={GREY[600]} borderColor={GREY[600]} />
      </View>
    </ImageBackground>
  </View>
);

export default NiCameraPreview;
