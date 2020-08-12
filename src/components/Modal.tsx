import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import NiButton from '../form/Button';
import { WHITE, MODAL_BACKDROP_GREY } from '../../styles/colors';
import { BORDER_RADIUS, PADDING, MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BLACK, FIRA_SANS_REGULAR } from '../../styles/fonts';

interface ConfirmModalProps {
  visible: boolean,
  title: string,
  contentText: string,
  buttonCaption: string,
  onPress: () => void,
  onRequestClose: () => void
};

const ConfirmModal = ({ visible, title, contentText, buttonCaption, onPress, onRequestClose }: ConfirmModalProps) => (
  <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent} >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.contentText}>{contentText}</Text>
        <NiButton style={styles.button} caption={buttonCaption} onPress={onPress}></NiButton>
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
    padding: PADDING.XXL,
    backgroundColor: MODAL_BACKDROP_GREY,
  },
  modalContent: {
    display: 'flex',
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: PADDING.XL,
  },
  title: {
    ...FIRA_SANS_BLACK.MD,
    marginBottom: MARGIN.LG,
    textAlign: 'center',
  },
  contentText: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'center',
    marginBottom: MARGIN.LG,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ConfirmModal;
