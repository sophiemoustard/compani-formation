import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NiModal from '../../../components/Modal';
import styles from './styles';

interface ExitProfileModalProps {
  visible: boolean,
  onPressCancelButton: () => void,
  onPressConfirmButton: () => void,
}

const ExitProfileModal = ({
  visible,
  onPressCancelButton,
  onPressConfirmButton,
}: ExitProfileModalProps) => (
  <NiModal visible={visible}>
    <Text style={styles.title}>Es-tu sûr de cela ?</Text>
    <Text style={styles.contentText}>Tes modifications ne seront pas enregistrées.</Text>
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.cancelButton} onPress={onPressCancelButton}>
        <Text style={styles.buttonText}>Annuler</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onPressConfirmButton}>
        <Text style={styles.buttonText}>Quitter</Text>
      </TouchableOpacity>
    </View>
  </NiModal>
);

export default ExitProfileModal;
