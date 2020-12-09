import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, BackHandler, Dimensions, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import styles from './styles';
import { ICON } from '../../../styles/metrics';
import { WHITE } from '../../../styles/colors';
import IconButton from '../../IconButton';
import { IONICONS } from '../../../core/data/constants';

interface NiCameraShootingProps {
  setPreviewVisible: (visible: boolean) => void,
  setCapturedImage: (photo: any) => void,
  goBack: () => void,
}

const NiCameraShooting = ({ setPreviewVisible, setCapturedImage, goBack }: NiCameraShootingProps) => {
  const camera = useRef<Camera>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [flashMode, setFlashMode] = useState<string>('off');
  const [ratio, setRatio] = useState<string | undefined>();

  const closerValue = (array, value) => {
    let tempCloserValue = array[0];
    for (let i = 1; i < array.length; i += 1) {
      if (Math.abs(array[i] - value) < (Math.abs(tempCloserValue - value))) tempCloserValue = array[i];
    }
    return tempCloserValue;
  };

  const setScreenDimension = async () => {
    if (Platform.OS === 'ios' || !camera.current) return;

    const supportedratios = await camera.current.getSupportedRatiosAsync();
    const { height, width } = Dimensions.get('window');
    const screenRatio = height / width;
    const ratiosNumbers = supportedratios?.map((supportedratio) => {
      const values = supportedratio.split(':');
      return Number(values[0]) / Number(values[1]);
    });

    const index = ratiosNumbers.indexOf(closerValue(ratiosNumbers, screenRatio));
    setRatio(supportedratios[index]);
  };

  const onTakePicture = async () => {
    const photo: any = await camera.current?.takePictureAsync({ skipProcessing: true });
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const onHandleFlashMode = () => {
    switch (flashMode) {
      case 'on': setFlashMode('off');
        break;
      case 'off': setFlashMode('on');
        break;
      default: setFlashMode('auto');
        break;
    }
  };

  return (
    <Camera ref={camera} type={cameraType} flashMode={flashMode} style={styles.camera}
      ratio ={ratio} onCameraReady={setScreenDimension}>
      <View style={styles.buttons}>
        <IconButton iconFamily={IONICONS} onPress={onHandleFlashMode} style={styles.flash} color={WHITE}
          size={ICON.XL} name={flashMode === 'on' ? 'md-flash' : 'md-flash-off'}/>
        <TouchableOpacity onPress={onTakePicture} style={styles.takePicture} />
        <IconButton iconFamily={IONICONS} style={styles.cameraType} color={WHITE}
          name={cameraType === 'front' ? 'ios-reverse-camera' : 'ios-camera'}
          onPress={() => {
            setCameraType(cameraType === 'back' ? 'front' : 'back');
          }} size={ICON.XL} />
      </View>
    </Camera>
  );
};

export default NiCameraShooting;
