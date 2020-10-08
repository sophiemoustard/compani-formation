import React from 'react';
import { View, Modal } from 'react-native';
import styles from './styles';

interface NiModalProps {
  visible: boolean,
  children: any,
}

const NiModal = ({ visible, children }: NiModalProps) => (
  <Modal visible={visible} transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent} >
        {children}
      </View>
    </View>
  </Modal>
);

export default NiModal;
