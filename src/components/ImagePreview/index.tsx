import { useCallback, useEffect, useState } from 'react';
import { View, Modal, Alert, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { IMAGE } from '../../core/data/constants';
import { WHITE } from '../../styles/colors';
import { ICON, SCREEN_HEIGHT } from '../../styles/metrics';
import NiImage from '../Image';
import NiPrimaryButton from '../form/PrimaryButton';
import FeatherButton from '../icons/FeatherButton';
import ZoomImage from '../ZoomImage';
import styles from './styles';

interface sourceProps {
  visible: boolean,
  link: string,
  type: string
}

interface ImagePreviewProps {
  source: sourceProps,
  deleteFile: () => void,
  onRequestClose: () => void,
  showButton?: boolean,
}

const ImagePreview = ({ source, deleteFile, onRequestClose, showButton = true }: ImagePreviewProps) => {
  const [zoomImage, setZoomImage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { visible, link, type } = source;

  const unmount = useCallback(() => {
    setIsLoading(false);
    onRequestClose();
  }, [onRequestClose]);

  const hardwareBackPress = useCallback(() => {
    unmount();
    return true;
  }, [unmount]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const onDeleteFile = async () => {
    try {
      setIsLoading(true);
      await deleteFile();
      unmount();
    } catch (e) {
      Alert.alert(
        'Echec de la suppression',
        'Veuillez réessayer',
        [{ text: 'OK', onPress: unmount }],
        { cancelable: false }
      );
    }
  };

  return (
    <Modal visible={visible} onRequestClose={unmount}>
      <View style={styles.container}>
        {type === IMAGE
          ? <View style={styles.imageContainer}>
            <NiImage source={{ uri: link }} imgHeight={SCREEN_HEIGHT / 2} onPress={() => setZoomImage(true)} />
          </View>
          : <View style={styles.pdfContainer}>
            <WebView source={{ uri: link }} style={styles.pdfContent} />
          </View>
        }

        <View style={styles.buttonContainer}>
          {showButton && <NiPrimaryButton caption='Supprimer' onPress={onDeleteFile} loading={isLoading}
            disabled={isLoading} customStyle={styles.button} />}
        </View>
      </View>
      {!zoomImage && <FeatherButton name={'x-circle'} onPress={unmount} size={ICON.XL} color={WHITE}
        disabled={isLoading}
        style={styles.goBack} />}
      {zoomImage && source && type === IMAGE &&
        <ZoomImage image={{ uri: link }} setZoomImage={setZoomImage} />}
    </Modal>
  );
};

export default ImagePreview;
