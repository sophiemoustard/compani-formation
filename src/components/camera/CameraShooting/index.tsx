import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import styles from './styles';
import { ICON } from '../../../styles/metrics';
import { WHITE } from '../../../styles/colors';
import IconButton from '../../IconButton';
import { IONICONS } from '../../../core/data/constants';

interface NiCameraShootingProps {
  setPreviewVisible: (visible: boolean) => void,
  setCapturedImage: (photo: any) => void,
}

const NiCameraShooting = ({ setPreviewVisible, setCapturedImage }: NiCameraShootingProps) => {
  const camera = useRef<Camera>(null);
  const { front, back } = Camera.Constants.Type;
  const { on, off } = Camera.Constants.FlashMode;
  const [cameraType, setCameraType] = useState(front);
  const [flashMode, setFlashMode] = useState(off);
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

  const onHandleCameraType = () => {
    setCameraType(previousCameraType => (previousCameraType === back ? front : back));
    setFlashMode(off);
  };

  const onHandleFlashMode = () => {
    if (cameraType === back) setFlashMode(previousFlashMode => (previousFlashMode === on ? off : on));
  };

  return (
    <Camera ref={camera} type={cameraType} flashMode={flashMode} style={styles.camera}
      ratio ={ratio} onCameraReady={setScreenDimension}>
      <View style={styles.buttons}>
        <IconButton disabled={cameraType === front} iconFamily={IONICONS} onPress={onHandleFlashMode}
          style={styles.flash} color={WHITE} size={ICON.XL} name={flashMode === on ? 'md-flash' : 'md-flash-off'}/>
        <TouchableOpacity onPress={onTakePicture} style={styles.takePicture} />
        <IconButton iconFamily={IONICONS} style={styles.cameraType} color={WHITE}size={ICON.XL}
          name={cameraType === front ? 'ios-reverse-camera' : 'ios-camera'} onPress={onHandleCameraType} />
      </View>
    </Camera>
  );
};

export default NiCameraShooting;
