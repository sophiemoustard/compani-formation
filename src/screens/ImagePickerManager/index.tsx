import { useState, useEffect, useCallback } from 'react';
import { Alert, ActivityIndicator, Text, Modal, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraCapturedPicture } from 'expo-camera';
import commonStyle from '../../styles/common';
import { GREY } from '../../styles/colors';
import styles from './styles';

interface ImagePickerManagerModalProps {
  visible: boolean,
  savePicture: (image: CameraCapturedPicture) => void,
  onRequestClose: () => void,
  goBack?: () => void,
}

const ImagePickerManagerModal = ({ visible, savePicture, onRequestClose, goBack }: ImagePickerManagerModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (visible) setTimeout(() => pickImage(), 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const unmount = useCallback(() => {
    setIsLoading(false);
    setIsSaving(false);
    onRequestClose();
  }, [onRequestClose]);

  const pickImage = async () => {
    try {
      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      setIsLoading(false);
      if (!result.cancelled) onSavePhoto(result);
      else unmount();
    } catch (e) {
      Alert.alert(
        'La galerie ne répond pas',
        'Veuillez réessayer',
        [{ text: 'OK', onPress: unmount }],
        { cancelable: false }
      );
    }
  };

  const onSavePhoto = async (photo) => {
    try {
      setIsSaving(true);
      setIsLoading(true);
      await savePicture(photo);
      unmount();
      if (goBack) goBack();
    } catch (e) {
      Alert.alert(
        'Echec de l\'enregistrement',
        'Veuillez réessayer',
        [{ text: 'OK', onPress: unmount }],
        { cancelable: false }
      );
    }
  };

  return (
    <Modal visible={visible}>
      {isLoading && <View style={styles.loader}>
        {isSaving && <Text style={styles.text}>Enregistrement en cours...</Text>}
        <ActivityIndicator style={commonStyle.disabled} color={GREY[300]} size='large' />
      </View>}
    </Modal>
  );
};

export default ImagePickerManagerModal;
