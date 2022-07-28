import { useState, useRef } from 'react';
import { View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import styles from './styles';
import { ICON } from '../../../styles/metrics';
import { WHITE } from '../../../styles/colors';
import IoniconsButton from '../../icons/IoniconsButton';

interface NiCameraProps {
  setPreviewVisible: (visible: boolean) => void,
  setCapturedImage: (photo: any) => void,
}

const NiCamera = ({ setPreviewVisible, setCapturedImage }: NiCameraProps) => {
  const { front, back } = Camera.Constants.Type;
  const { on, off } = Camera.Constants.FlashMode;
  const camera = useRef<Camera>(null);
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

    const { height, width } = Dimensions.get('window');
    if (!width) return;
    const screenRatio = height / width;
    const supportedratios = await camera.current.getSupportedRatiosAsync();
    const ratiosNumbers = supportedratios?.map((supportedratio) => {
      const values = supportedratio.split(':');
      if (!values[1]) return null;
      return Number(values[0]) / Number(values[1]);
    });

    const index = ratiosNumbers.indexOf(closerValue(ratiosNumbers, screenRatio));
    setRatio(supportedratios[index]);
  };

  const flipPhoto = async photo => ImageManipulator.manipulateAsync(
    photo.uri,
    [{ flip: ImageManipulator.FlipType.Horizontal }]
  );

  const onTakePicture = async () => {
    const photo: any = await camera.current?.takePictureAsync({ skipProcessing: true });
    setPreviewVisible(true);
    setCapturedImage(cameraType === back ? photo : await flipPhoto(photo));
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
        <IoniconsButton disabled={cameraType === front} onPress={onHandleFlashMode} style={styles.flash} color={WHITE}
          size={ICON.XL} name={flashMode === on ? 'md-flash' : 'md-flash-off'}/>
        <TouchableOpacity onPress={onTakePicture} style={styles.takePicture} />
        <IoniconsButton style={styles.cameraType} color={WHITE} size={ICON.XL} onPress={onHandleCameraType}
          name={cameraType === front ? 'ios-camera-reverse' : 'ios-camera'} />
      </View>
    </Camera>
  );
};

export default NiCamera;
