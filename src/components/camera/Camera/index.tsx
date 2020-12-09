import React, { useState, useEffect } from 'react';
import { View, Alert, BackHandler } from 'react-native';
import { Camera } from 'expo-camera';
import styles from './styles';
import { NavigationType } from '../../../types/NavigationType';
import NiCameraPreview from '../CameraPreview';
import NiCameraShooting from '../CameraShooting';

interface NiCameraProps {
  navigation: NavigationType,
}

const NiCamera = ({ navigation }: NiCameraProps) => {
  const [startCamera, setStartCamera] = useState<boolean>(true);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  const onStartCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  useEffect(() => {
    onStartCamera();
  }, []);

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  const goBack = () => navigation.navigate('Home', { screen: 'Profile', params: { screen: 'Profile' } });

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
        <NiCameraShooting setPreviewVisible={setPreviewVisible} setCapturedImage={setCapturedImage} />)}
    </View>
  );
};

export default NiCamera;
