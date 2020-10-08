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
    ? 'https://apps.apple.com/app/id1447513534'
    : 'market://details?id=com.alenvi.compani';

  return (
    <NiModal visible={visible}>
      <Text style={styles.title}>Nouvelle version de l'app disponible !</Text>
      <Text style={styles.contentText}>
          Merci de mettre votre application à jour pour pouvoir continuer d'utiliser l'application :)
      </Text>
      <NiButton style={styles.button} caption="Mettre à jour" onPress={() => { Linking.openURL(appUrl); }} />
    </NiModal>
  );
};

export default UpdateAppModal;
