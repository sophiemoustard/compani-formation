import { Text, Image, View } from 'react-native';
import styles from '../styles';

const TrainerEmptyState = () => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.emptyStateText}>Vous n’avez pas encore animé de formation pour Compani...</Text>
    <Image source={require('../../../../assets/images/doc-tableau-blanc.webp')} style={styles.emptyStateTrainerImage}
      resizeMode='contain' />
  </View>
);

export default TrainerEmptyState;
