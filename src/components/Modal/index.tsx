import { View, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './styles';

interface NiModalProps {
  visible: boolean,
  children: any,
  onRequestClose?: () => void,
}

const NiModal = ({ visible, children, onRequestClose }: NiModalProps) => {
  const isIos = Platform.OS === 'ios';

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
      <KeyboardAvoidingView style={styles.modalContainer} behavior={isIos ? 'padding' : 'height'}>
        <View style={styles.modalContent}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NiModal;
