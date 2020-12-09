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
      <View style={styles.view1}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onRetakePicture}>
            <Text style={styles.text}>Reprendre la photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onSavePhoto(photo)}>
            <Text style={styles.text}>Enregistrer la photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </View>
);

export default NiCameraPreview;
