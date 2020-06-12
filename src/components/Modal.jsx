import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet } from 'react-native';
import NiButton from '../components/form/Button';

const NiModal = ({ visible, title, contentText, buttonCaption, onPress }) => {
  return (
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
};

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
    padding: 40,
    backgroundColor: '#00000040',
  },
  modalContent: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  contentText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default NiModal;
