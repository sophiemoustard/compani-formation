import React, { useState, useEffect } from 'react';
import { Platform, Alert, View, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import mime from 'mime';
import Users from '../../api/users';
import { UserType } from '../../types/UserType';
import { ActionType, ActionWithoutPayloadType } from '../../types/store/StoreType';
import MainActions from '../../store/main/actions';
import { navigate } from '../../navigationRef';
import commonStyle from '../../styles/common';
import { GREY } from '../../styles/colors';
import styles from './styles';
import { NavigationType } from '../../types/NavigationType';
import { IMAGE_MAX_SIZE } from '../../core/data/constants';

interface ImagePickerContainerProps {
  navigation: NavigationType;
  loggedUser: UserType,
  setLoggedUser: (user: UserType) => void,

}

const ImagePickerContainer = ({ navigation, loggedUser, setLoggedUser }:ImagePickerContainerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
    requestPermissions();
    setTimeout(pickImage, 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      onSavePhoto(result);
    } else {
      navigation.dispatch(CommonActions.goBack());
    }
  };
  const goBack = () => navigate('Home', { screen: 'Profile', params: { screen: 'Profile' } });

  const compressPhoto = async (uri, size) => {
    const compressedPhoto = await ImageManipulator.manipulateAsync(
      uri,
      [],
      { compress: 1 / (size / IMAGE_MAX_SIZE) }
    );

    return `file:///${compressedPhoto.uri.split('file:/').join('')}`;
  };

  const onSavePhoto = async (photo) => {
    try {
      setIsLoading(true);
      const fileInfos = await FileSystem.getInfoAsync(photo.uri);
      const uri = (fileInfos.size && ((fileInfos.size / IMAGE_MAX_SIZE) > 1))
        ? await compressPhoto(photo.uri, fileInfos.size)
        : `file:///${photo.uri.split('file:/').join('')}`;

      const data: FormData = new FormData();
      const { firstname, lastname } = loggedUser.identity;
      const file = { uri, type: mime.getType(uri), name: `photo_${firstname}_${lastname}` };
      data.append('fileName', `photo_${firstname}_${lastname}`);
      data.append('file', file);
      if (loggedUser.picture?.link) await Users.deleteImage(loggedUser._id);
      await Users.uploadImage(loggedUser._id, data);
      const user = await Users.getById(loggedUser._id);
      setLoggedUser(user);
      goBack();
    } catch (e) {
      Alert.alert(
        'Echec de l\'enregistrement',
        'Veuillez réessayer',
        [{ text: 'OK', onPress: () => navigate('Profile') }], { cancelable: false }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading && (
    <View style={styles.loader}>
      <Text style={styles.text}>Enregistrement en cours...</Text>
      <ActivityIndicator style={commonStyle.disabled} color={GREY[300]} size='large' />
    </View>
  );
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePickerContainer);
