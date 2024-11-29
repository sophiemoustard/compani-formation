import { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, View } from 'react-native';
import * as Camera from 'expo-camera/legacy';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { GREY, PINK } from '../../styles/colors';
import { INTER_B2B } from '../../core/data/constants';
import AttendanceSheets from '../../api/attendanceSheets';
import styles from './styles';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import CameraModal from '../../components/camera/CameraModal';
import ImagePickerManager from '../../components/ImagePickerManager';
import { PictureType } from '../../types/PictureTypes';
import { formatImage, formatPayload } from '../../core/helpers/pictures';
import { CourseType } from '../../types/CourseTypes';
import FeatherButton from '../icons/FeatherButton';
import { ICON } from '../../styles/metrics';

interface UploadMethodsProps {
  attendanceSheetToAdd: string,
  course: CourseType,
  goToParent: () => void,
}

const UploadMethods = ({ attendanceSheetToAdd, course, goToParent }: UploadMethodsProps) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [camera, setCamera] = useState<boolean>(false);
  const [imagePickerManager, setImagePickerManager] = useState<boolean>(false);

  const hardwareBackPress = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const alert = (component: string) => {
    Alert.alert(
      'Accès refusé',
      `Vérifiez que l'application a bien l'autorisation d'accéder à ${component}`,
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  const requestPermissionsForCamera = async () => {
    try {
      setIsLoading(true);
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') setCamera(true);
      else alert('l\'appareil photo');
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermissionsForImagePicker = async () => {
    try {
      setIsLoading(true);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') setImagePickerManager(true);
      else alert('la galerie');
    } finally {
      setIsLoading(false);
    }
  };

  const savePicture = async (picture: PictureType) => {
    try {
      if (course) {
        const file = await formatImage(picture as Camera.CameraCapturedPicture, `emargement-${attendanceSheetToAdd}`);
        const data = formatPayload({
          file,
          course: course._id,
          ...(course.type === INTER_B2B ? { trainee: attendanceSheetToAdd } : { date: attendanceSheetToAdd }),
        });
        await AttendanceSheets.upload(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      goToParent();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <FeatherButton name='arrow-left' onPress={navigation.goBack} size={ICON.MD} color={GREY[600]} />
      </View>
      <View style={styles.container}>
        <NiPrimaryButton caption='Prendre une photo' customStyle={styles.button} onPress={requestPermissionsForCamera}
          disabled={isLoading} bgColor={GREY[100]} color={PINK[500]} />
        <NiPrimaryButton caption='Ajouter une photo' customStyle={styles.button} disabled={isLoading} color={PINK[500]}
          onPress={requestPermissionsForImagePicker} bgColor={GREY[100]} />
      </View>
      {camera && <CameraModal onRequestClose={() => setCamera(false)} savePicture={savePicture} visible={camera} />}
      {imagePickerManager && <ImagePickerManager onRequestClose={() => setImagePickerManager(false)}
        savePicture={savePicture} />}
    </SafeAreaView>

  );
};

export default UploadMethods;
