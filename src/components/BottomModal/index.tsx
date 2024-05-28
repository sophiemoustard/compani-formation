import { View, Modal, ScrollView } from 'react-native';
import FeatherButton from '../icons/FeatherButton';
import { ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import styles from './styles';

interface NiBottomModalProps {
  visible: boolean,
  children: any,
  onRequestClose: () => void,
}

const BottomModal = ({ visible, children, onRequestClose }: NiBottomModalProps) => (
  <Modal visible={visible} transparent onRequestClose={onRequestClose}>
    <ScrollView contentContainerStyle={styles.modalContainer}>
      <View style={styles.modalContent}>
        <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={GREY[600]}
          style={styles.goBack} />
        {children}
      </View>
    </ScrollView>
  </Modal>);

export default BottomModal;
