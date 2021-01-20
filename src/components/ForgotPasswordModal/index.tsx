import React from 'react';
import { Text, View, Modal } from 'react-native';
import NiButton from '../form/Button';
import FeatherButton from '../icons/FeatherButton';
import { ICON } from '../../styles/metrics';
import { GREY, PINK, WHITE } from '../../styles/colors';
import styles from './styles';

interface ForgotPasswordModalProps {
  visible: boolean,
  isLoading: boolean,
  setModal: (value) => void,
  sendEmail: () => void
}

const ForgotPasswordModal = ({
  visible,
  isLoading,
  setModal,
  sendEmail,
}: ForgotPasswordModalProps) => (
  <Modal visible={visible} transparent={true} onRequestClose={() => setModal(false)}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <FeatherButton name={'x-circle'} onPress={() => setModal(false)} size={ICON.LG} color={GREY[600]}
          style={styles.goBack} />
        <View style={styles.content}>
          <Text style={styles.title}>Confirmez votre identité</Text>
          <Text style={styles.text} >
      Pour réinitialiser votre mot de passe, vous devez d’abord confirmer votre identité par un code temporaire.
          </Text>
        </View>
        <NiButton caption='Recevoir le code par e-mail' style={styles.button} onPress={sendEmail} loading={isLoading}
          bgColor={PINK[500]} borderColor={PINK[500]} color={WHITE} />
      </View>
    </View>
  </Modal>);

export default ForgotPasswordModal;
