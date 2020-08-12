import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet } from 'react-native';
import NiButton from '../form/Button';
import { WHITE, MODAL_BACKDROP_GREY } from '../../styles/colors';
import { BORDER_RADIUS, PADDING, MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BLACK, FIRA_SANS_REGULAR } from '../styles/fonts';

const NiModal = ({ visible, title, contentText, buttonCaption, onPress }) => (
  <Modal visible={visible} transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent} >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.contentText}>{contentText}</Text>
        <NiButton style={styles.button} caption={buttonCaption} onPress={onPress}></NiButton>
      </View>
    </View>
  </Modal>
);

NiModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  contentText: PropTypes.string,
  buttonCaption: PropTypes.string,
  onPress: PropTypes.func,
};

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

export default NiModal;
