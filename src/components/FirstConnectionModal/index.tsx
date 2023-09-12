import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NiSecondaryButton from '../form/SecondaryButton';
import FeatherButton from '../icons/FeatherButton';
import Modal from '../Modal';
import { GREY } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import styles from './styles';

interface FirstConnectionModalProps {
  visible: boolean,
  onRequestClose: () => void,
}

const FirstConnectionModal = ({ visible, onRequestClose }: FirstConnectionModalProps) => {
  const navigation = useNavigation();

  const goToEmailForm = () => {
    onRequestClose();
    navigation.navigate('EmailForm', { firstConnection: true });
  };

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={GREY[600]}
          style={styles.goBack} />
        <View style={styles.modalContent}>
          <NiSecondaryButton caption="Je me connecte avec mon adresse email"
            onPress={goToEmailForm} />
          <NiSecondaryButton caption="Je me connecte avec un code donné par le formateur"
            onPress={() => {}} />
        </View>
      </View>
    </Modal>
  );
};

export default FirstConnectionModal;
