import React, { useState, useEffect } from 'react';
import { View, BackHandler, Alert } from 'react-native';
import { connect } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList, RootBottomTabParamList } from '../../types/NavigationType';
import NiCameraPreview from '../../components/camera/CameraPreview';
import NiCamera from '../../components/camera/Camera';
import FeatherButton from '../../components/icons/FeatherButton';
import { ICON } from '../../styles/metrics';
import { WHITE } from '../../styles/colors';
import styles from './styles';
import { UserType } from '../../types/UserType';
import { ActionType, ActionWithoutPayloadType } from '../../types/store/StoreType';
import MainActions from '../../store/main/actions';
import { savePhoto } from '../../core/helpers/pictures';

interface CameraProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList>,
StackScreenProps<RootBottomTabParamList>
> {
  loggedUser: UserType,
  setLoggedUser: (user: UserType) => void,
}

const Camera = ({ navigation, loggedUser, setLoggedUser }: CameraProps) => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const goBack = () => navigation.navigate('Profile');

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSavePhoto = async (photo) => {
    try {
      setIsLoading(true);
      const user = await savePhoto(photo, loggedUser);
      setLoggedUser(user);
      goBack();
    } catch (e) {
      Alert.alert(
        'Echec de l\'enregistrement',
        'Essayez de reprendre la photo',
        [{ text: 'OK', onPress: () => navigation.navigate('Camera') }],
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
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <NiCameraPreview photo={capturedImage} onSavePhoto={onSavePhoto} onRetakePicture={onRetakePicture}
          loading={isLoading} />
      ) : (
        <NiCamera setPreviewVisible={setPreviewVisible} setCapturedImage={setCapturedImage} />)}
      <FeatherButton name={'x-circle'} onPress={goBack} size={ICON.XL} color={WHITE} style={styles.goBack} />
    </View>
  );
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
