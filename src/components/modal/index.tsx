import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { WHITE, MODAL_BACKDROP_GREY } from '../../styles/colors';
import { BORDER_RADIUS, PADDING } from '../../styles/metrics';

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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: MODAL_BACKDROP_GREY,
  },
  modalContent: {
    display: 'flex',
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.XL,
    width: '90%',
    padding: PADDING.LG,
  },
});

export default NiModal;
