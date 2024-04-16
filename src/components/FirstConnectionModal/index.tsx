import { View } from 'react-native';
import { useRouter } from 'expo-router';
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
  const router = useRouter();

  const goToEmailForm = () => {
    onRequestClose();
    router.navigate({ pathname: '/Authentication/EmailForm/', params: { firstConnection: true } });
  };

  const goToLoginCodeForm = () => {
    onRequestClose();
    router.navigate('LoginCodeForm');
  };

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={GREY[600]} style={styles.goBack} />
      <View style={styles.modalContent}>
        <NiSecondaryButton caption="Je me connecte avec mon adresse email" onPress={goToEmailForm}
          customStyle={styles.button}/>
        <NiSecondaryButton caption="Je me connecte avec un code donné par le formateur" onPress={goToLoginCodeForm} />
      </View>
    </Modal>
  );
};

export default FirstConnectionModal;
