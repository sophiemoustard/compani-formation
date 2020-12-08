import React from 'react';
import { Text, Modal, View } from 'react-native';
import NiButton from '../form/Button';
import { PINK, WHITE } from '../../styles/colors';
import styles from './styles';

interface BottomPopUpProps {
  visible: boolean,
  title: string,
  contentText: () => JSX.Element,
  onPressConfirmButton: () => void,
}

const BottomPopUp = ({ visible, title, contentText, onPressConfirmButton }: BottomPopUpProps) => (
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

export default BottomPopUp;
