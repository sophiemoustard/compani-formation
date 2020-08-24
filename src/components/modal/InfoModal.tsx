import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { WHITE, MODAL_BACKDROP_GREY, GREY } from '../../styles/colors';
import { BORDER_RADIUS, ICON, PADDING, MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import IconButton from '../IconButton';

interface InfoModalProps {
  visible: boolean,
  title: string,
  content: React.ReactNode,
  onRequestClose: () => void,
  headerStyle?: object,
}

const InfoModal = ({ visible, title, content, onRequestClose }: InfoModalProps) => (
  <Modal visible={visible} transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={3}>{title}</Text>
          <IconButton name='x-circle' onPress={onRequestClose} size={ICON.LG}
            color={GREY[500]} style={styles.closeButton}/>
        </View>
        <View>{content}</View>
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: MARGIN.XL,
  },
  title: {
    ...FIRA_SANS_BOLD.MD,
    flex: 1,
  },
  closeButton: {
    alignItems: 'flex-end',
    width: 40,
  },
});

export default InfoModal;
