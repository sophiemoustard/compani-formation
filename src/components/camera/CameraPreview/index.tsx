import React from 'react';
import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
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
        <TouchableOpacity style={[styles.button, styles.SavePictureButton]} onPress={() => onSavePhoto(photo)}>
          <Text style={[styles.text, styles.savePictureText]}>Enregistrer la photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.retakePictureButton]} onPress={onRetakePicture}>
          <Text style={[styles.text, styles.retakePictureText]}>Reprendre la photo</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);

export default NiCameraPreview;
