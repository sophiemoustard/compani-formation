import React, { useState, useEffect } from 'react';
import { View, BackHandler, Alert } from 'react-native';
import { connect } from 'react-redux';
import mime from 'mime';
import { Camera as Cam } from 'expo-camera';
import { NavigationType } from '../../types/NavigationType';
import NiCameraPreview from '../../components/camera/CameraPreview';
import NiCamera from '../../components/camera/Camera';
import IconButton from '../../components/IconButton';
import { ICON } from '../../styles/metrics';
import { WHITE } from '../../styles/colors';
import styles from './styles';
import Users from '../../api/users';
import { UserType } from '../../types/UserType';
import { ActionType, ActionWithoutPayloadType } from '../../types/store/StoreType';
import MainActions from '../../store/main/actions';

interface CameraProps {
  navigation: NavigationType,
  loggedUser: UserType,
  setLoggedUser: (user: UserType) => void,

}

const Camera = ({ navigation, loggedUser, setLoggedUser }: CameraProps) => {
  const [startCamera, setStartCamera] = useState<boolean>(true);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onSavePhoto = async (photo) => {
    try {
      setIsLoading(true);
      const data: FormData = new FormData();
      const uri = `file:///${photo.uri.split('file:/').join('')}`;
      const file = { uri, type: mime.getType(uri), name: 'test' };
      const { firstname, lastname } = loggedUser.identity;
      data.append('fileName', `${lastname}${firstname}picture${Math.floor(Math.random() * (99))}`);
      data.append('file', file);
      if (loggedUser.picture?.link) await Users.deleteImage(loggedUser._id);
      await Users.uploadImage(loggedUser._id, data);
      const user = await Users.getById(loggedUser._id);
      setLoggedUser(user);
      goBack();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onRetakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    onStartCamera();
  };

  return startCamera && (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <NiCameraPreview photo={capturedImage} onSavePhoto={onSavePhoto} onRetakePicture={onRetakePicture}
          loading={isLoading} />
      ) : (
        <NiCamera setPreviewVisible={setPreviewVisible} setCapturedImage={setCapturedImage} />)}
      <IconButton name={'x-circle'} onPress={goBack} size={ICON.XL} color={WHITE} style={styles.goBack} />
    </View>
  );
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
