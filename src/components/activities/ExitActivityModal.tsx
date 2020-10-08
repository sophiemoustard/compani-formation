import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NiModal from '../modal';
import { WHITE, MODAL_BACKDROP_GREY, PINK } from '../../styles/colors';
import { BORDER_RADIUS, PADDING, MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';

interface ExitActivityModalProps {
  visible: boolean,
  onPressCancelButton: () => void,
  onPressConfirmButton: () => void,
}

const ExitActivityModal = ({
  visible,
  onPressCancelButton,
  onPressConfirmButton,
}: ExitActivityModalProps) => (
  <NiModal visible={visible}>
    <Text style={styles.title}>Es-tu sûr de cela ?</Text>
    <Text style={styles.contentText}>Tous tes progrès dans la leçon seront perdus.</Text>
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.cancelButton} onPress={onPressCancelButton}>
        <Text style={styles.buttonText}>Annuler</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onPressConfirmButton}>
        <Text style={styles.buttonText}>Quitter</Text>
      </TouchableOpacity>
    </View>
  </NiModal>
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
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.XL,
  },
  contentText: {
    ...FIRA_SANS_REGULAR.MD,
    marginBottom: MARGIN.XL,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: PINK[500],
  },
  cancelButton: {
    marginRight: MARGIN.XL,
  },
  closeButton: {
    marginRight: MARGIN.SM,
  },
});

export default ExitActivityModal;
