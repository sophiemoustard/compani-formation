import React from 'react';
import { View, ImageBackground } from 'react-native';
import { GREY, PINK, WHITE } from '../../../styles/colors';
import NiButton from '../../form/Button';
import styles from './style';

interface NiCameraPreviewProps {
  photo: any,
  onSavePhoto: (photo) => void,
  onRetakePicture: () => void,
}

const NiCameraPreview = ({ photo, onSavePhoto, onRetakePicture }: NiCameraPreviewProps) => (
  <View style={styles.container}>
    <ImageBackground source={{ uri: photo && photo.uri }}
      style={styles.photo}>
      <View style={styles.buttonContainer}>
        <NiButton caption='Enregistrer la photo' onPress={() => onSavePhoto(photo)}
          style={styles.button} bgColor={PINK[500]} color={WHITE} borderColor={PINK[500]} />
        <NiButton caption='Reprendre la photo' onPress={onRetakePicture}
          style={styles.button} bgColor={WHITE} color={GREY[600]} borderColor={GREY[600]} />
      </View>
    </ImageBackground>
  </View>
);

export default NiCameraPreview;
