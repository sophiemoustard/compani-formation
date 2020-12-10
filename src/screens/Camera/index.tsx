import React, { useState, useEffect } from 'react';
import { View, BackHandler, Alert } from 'react-native';
import { Camera as Cam } from 'expo-camera';
import styles from './styles';
import { NavigationType } from '../../types/NavigationType';
import NiCameraPreview from '../../components/camera/CameraPreview';
import NiCamera from '../../components/camera/Camera';

interface CameraProps {
  navigation: NavigationType,
}

const Camera = ({ navigation }: CameraProps) => {
  const [startCamera, setStartCamera] = useState<boolean>(true);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  const goBack = () => navigation.navigate('Home', { screen: 'Profile', params: { screen: 'Profile' } });

  const onStartCamera = async () => {
    const { status } = await Cam.requestPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert(
        'Accès refusé',
        'Vérifie que l\'application a bien l\'autorisation d\'utiliser l\'appareil photo',
        [{ text: 'OK', onPress: () => goBack() }], { cancelable: false }
      );
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onStartCamera(); }, []);

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  const onSavePhoto = () => {
    goBack();
  };

  const onRetakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    onStartCamera();
  };

  return startCamera && (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <NiCameraPreview photo={capturedImage} onSavePhoto={onSavePhoto} onRetakePicture={onRetakePicture} />
      ) : (
        <NiCamera setPreviewVisible={setPreviewVisible} setCapturedImage={setCapturedImage} />)}
    </View>
  );
};

export default Camera;
