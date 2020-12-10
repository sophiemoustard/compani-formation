import React from 'react';
import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { WHITE, PINK, GREY } from '../../../styles/colors';
import styles from './style';

interface NiCameraPreviewProps {
  photo: any,
  onSavePhoto: (photo) => void,
  onRetakePicture: () => void,
}

const NiCameraPreview = ({ photo, onSavePhoto, onRetakePicture }: NiCameraPreviewProps) => {
  const savePicture = { borderColor: PINK[500], backgroundColor: PINK[500], color: WHITE };
  const retakePicture = { borderColor: GREY[600], backgroundColor: WHITE, color: GREY[600] };
  const retakePictureStyle = styles(retakePicture);
  const savePictureStyle = styles(savePicture);
  return (
    <View style={retakePictureStyle.container}>
      <ImageBackground source={{ uri: photo && photo.uri }}
        style={retakePictureStyle.photo}>
        <View style={retakePictureStyle.buttonContainer}>
          <TouchableOpacity style={savePictureStyle.button} onPress={() => onSavePhoto(photo)}>
            <Text style={savePictureStyle.text}>Enregistrer la photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={retakePictureStyle.button} onPress={onRetakePicture}>
            <Text style={retakePictureStyle.text}>Reprendre la photo</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default NiCameraPreview;
