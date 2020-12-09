import React from 'react';
import { View, Modal } from 'react-native';
import styles from './styles';

interface NiModalProps {
  visible: boolean,
  children: any,
  onRequestClose?: () => void,
}

const NiModal = ({ visible, children, onRequestClose }: NiModalProps) => (
  <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {children}
      </View>
    </View>
  </Modal>
);

export default NiModal;
