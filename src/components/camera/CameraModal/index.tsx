import { useState, useEffect, useCallback } from 'react';
import { BackHandler, Alert, Modal } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';
import NiCameraPreview from '../CameraPreview';
import NiCamera from '../Camera';
import FeatherButton from '../../icons/FeatherButton';
import { ICON } from '../../../styles/metrics';
import { WHITE } from '../../../styles/colors';
import styles from './styles';

interface CameraModalProps {
  visible: boolean,
  savePicture: (image: CameraCapturedPicture) => void,
  onRequestClose: () => void,
}

const CameraModal = ({ visible, savePicture, onRequestClose }: CameraModalProps) => {
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const goBack = useCallback(() => {
    setCapturedImage(null);
    setIsLoading(false);
    onRequestClose();
  }, [onRequestClose]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const onSavePhoto = async (photo) => {
    try {
      setIsLoading(true);
      await savePicture(photo);
      goBack();
    } catch (e) {
      Alert.alert(
        'Echec de l\'enregistrement',
        'Essayez de reprendre la photo',
        [{ text: 'OK', onPress: goBack }],
        { cancelable: false }
      );
    }
  };

  const onRetakePicture = () => {
    setCapturedImage(null);
  };

  return (
    <Modal visible={visible} onRequestClose={goBack} style={styles.modal}>
      {capturedImage
        ? (<NiCameraPreview photo={capturedImage} onSavePhoto={onSavePhoto} onRetakePicture={onRetakePicture}
          loading={isLoading} />)
        : (<NiCamera setCapturedImage={setCapturedImage} />)}
      <FeatherButton name={'x-circle'} onPress={goBack} size={ICON.XL} color={WHITE} disabled={isLoading}
        style={styles.goBack} />
    </Modal>
  );
};

export default CameraModal;
