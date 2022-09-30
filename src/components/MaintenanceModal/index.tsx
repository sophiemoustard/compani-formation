import { Text } from 'react-native';
import NiModal from '../Modal';
import styles from './styles';

const MaintenanceModal = () => (
  <NiModal visible={true}>
    <Text style={styles.title}> L&apos;application est en maintenance !</Text>
    <Text style={styles.body}>Elle sera de nouveau disponible dans quelques minutes.</Text>
  </NiModal>
);

export default MaintenanceModal;
