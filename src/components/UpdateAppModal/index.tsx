import React from 'react';
import { Platform, Text, Linking } from 'react-native';
import NiModal from '../Modal';
import NiButton from '../form/Button';
import styles from './styles';

interface UpdateAppModalProps {
  visible: boolean
}

const UpdateAppModal = ({ visible }: UpdateAppModalProps) => {
  const appUrl = Platform.OS === 'ios'
    ? 'https://apps.apple.com/app/id/1516691161'
    : 'market://details?id=com.alenvi.compani';

  return (
    <NiModal visible={visible}>
      <Text style={styles.title}>Nouvelle version de l&apos;app disponible !</Text>
      <Text style={styles.contentText}>
        Merci de mettre à jour votre application pour pouvoir continuer à l&apos;utiliser :)
      </Text>
      <NiButton style={styles.button} caption="Mettre à jour" onPress={() => { Linking.openURL(appUrl); }} />
    </NiModal>
  );
};

export default UpdateAppModal;
