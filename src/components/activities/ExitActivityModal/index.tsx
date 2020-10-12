import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NiModal from '../../Modal';
import styles from './styles';

interface ExitActivityModalProps {
  visible: boolean,
  onPressCancelButton: () => void,
  onPressConfirmButton: () => void,
}

const ExitActivityModal = ({
  visible,
  onPressCancelButton,
  onPressConfirmButton,
}: ExitActivityModalProps) => (
  <NiModal visible={visible}>
    <Text style={styles.title}>Es-tu sûr de cela ?</Text>
    <Text style={styles.contentText}>Tous tes progrès dans la leçon seront perdus.</Text>
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

export default ExitActivityModal;
