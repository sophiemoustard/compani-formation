import React, { useState, useEffect } from 'react';
import { Alert, View, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { UserType } from '../../types/UserType';
import { ActionType, ActionWithoutPayloadType } from '../../types/store/StoreType';
import MainActions from '../../store/main/actions';
import { navigate } from '../../navigationRef';
import commonStyle from '../../styles/common';
import { GREY } from '../../styles/colors';
import styles from './styles';
import { NavigationType } from '../../types/NavigationType';
import { savePhoto } from '../../core/helpers/pictures';

interface ImagePickerManagerProps {
  navigation: NavigationType;
  loggedUser: UserType,
  setLoggedUser: (user: UserType) => void,
}

const ImagePickerManager = ({ navigation, loggedUser, setLoggedUser }:ImagePickerManagerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    pickImage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => navigate('Home', { screen: 'Profile', params: { screen: 'Profile' } });

  const pickImage = async () => {
    try {
      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      setIsLoading(false);
      if (!result.cancelled) onSavePhoto(result);
      else navigation.dispatch(CommonActions.goBack());
    } catch (e) {
      Alert.alert(
        'La galerie ne répond pas',
        'Veuillez réessayer',
        [{ text: 'OK', onPress: () => navigation.dispatch(CommonActions.goBack()) }], { cancelable: false }
      );
    }
  };

  const onSavePhoto = async (photo) => {
    try {
      setIsSaving(true);
      setIsLoading(true);
      const user = await savePhoto(photo, loggedUser);
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
      setIsSaving(false);
    }
  };

  return isLoading && (
    <View style={styles.loader}>
      {isSaving && <Text style={styles.text}>Enregistrement en cours...</Text>}
      <ActivityIndicator style={commonStyle.disabled} color={GREY[300]} size='large' />
    </View>
  );
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePickerManager);
