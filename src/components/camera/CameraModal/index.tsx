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
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const goBack = useCallback(() => {
    setCapturedImage(null);
    setPreviewVisible(false);
    onRequestClose();
    setIsLoading(false);
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
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onRetakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  return (
    <Modal visible={visible} onRequestClose={goBack} style={styles.modal}>
      {previewVisible && capturedImage
        ? (<NiCameraPreview photo={capturedImage} onSavePhoto={onSavePhoto} onRetakePicture={onRetakePicture}
          loading={isLoading} />)
        : (<NiCamera setPreviewVisible={setPreviewVisible} setCapturedImage={setCapturedImage} />)}
      <FeatherButton name={'x-circle'} onPress={goBack} size={ICON.XL} color={WHITE} disabled={isLoading}
        style={styles.goBack} />
    </Modal>
  );
};

export default CameraModal;
