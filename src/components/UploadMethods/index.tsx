import { useState } from 'react';
import { Alert, View } from 'react-native';
import * as Camera from 'expo-camera/legacy';
import * as ImagePicker from 'expo-image-picker';
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

interface UploadMethodsProps {
  attendanceSheetToAdd: string,
  course: CourseType,
  goBack: () => void,
}

const UploadMethods = ({ attendanceSheetToAdd, course, goBack }: UploadMethodsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [camera, setCamera] = useState<boolean>(false);
  const [imagePickerManager, setImagePickerManager] = useState<boolean>(false);

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

  const takePicture = () => {
    requestPermissionsForCamera();
  };

  const addPictureFromGallery = () => {
    requestPermissionsForImagePicker();
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
      goBack();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <NiPrimaryButton caption='Prendre une photo' customStyle={styles.button} onPress={takePicture}
          disabled={isLoading} bgColor={GREY[100]} color={PINK[500]} />
        <NiPrimaryButton caption='Ajouter une photo' customStyle={styles.button} onPress={addPictureFromGallery}
          disabled={isLoading} bgColor={GREY[100]} color={PINK[500]} />
      </View>
      {camera && <CameraModal onRequestClose={() => setCamera(false)} savePicture={savePicture} visible={camera} />}
      {imagePickerManager && <ImagePickerManager onRequestClose={() => setImagePickerManager(false)}
        savePicture={savePicture} />}
    </>
  );
};

export default UploadMethods;
