import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { WHITE, MODAL_BACKDROP_GREY, GREY } from '../../styles/colors';
import { BORDER_RADIUS, ICON, PADDING, MARGIN } from '../../styles/metrics';
import IconButton from '../IconButton';

const CloseButtonModal = ({ visible, title, content, onRequestClose }) => (
  <Modal visible={visible} transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={3}>{title}</Text>
          <IconButton name='x-circle' onPress={onRequestClose} size={ICON.LG}
            color={GREY[500]} style={styles.closeButton}/>
        </View>
        <View style={styles.content}>
          {content}
        </View>
      </View>
    </View>
  </Modal>
);

CloseButtonModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.element,
  onRequestClose: PropTypes.func,
  headerStyle: PropTypes.object,
};

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
    width: 320,
    padding: PADDING.LG,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    marginBottom: MARGIN.XL,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
  closeButton: {
    alignItems: 'flex-end',
    width: 40,
  },
  content: {
  },
});

export default CloseButtonModal;
