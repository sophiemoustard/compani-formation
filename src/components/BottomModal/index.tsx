import React from 'react';
import { Text, Modal, View } from 'react-native';
import NiButton from '../../components/form/Button';
import { PINK, WHITE } from '../../styles/colors';
import styles from './styles';

interface BottomModalProps {
  visible: boolean,
  title: string,
  contentText: () => JSX.Element,
  onPressConfirmButton: () => void,
}

const BottomModal = ({ visible, title, contentText, onPressConfirmButton }: BottomModalProps) => (
  <Modal visible={visible} transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        {contentText()}
        <NiButton caption="OK" onPress={onPressConfirmButton} style={styles.button}
          bgColor={PINK[500]} color={WHITE} borderColor={PINK[500]} />
      </View>
    </View>
  </Modal>
);

export default BottomModal;
