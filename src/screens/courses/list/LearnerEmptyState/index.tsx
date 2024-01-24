import { Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NiPrimaryButton from '../../../../components/form/PrimaryButton';
import styles from '../styles';

const LearnerEmptyState = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.emptyStateContainer} onPress={() => navigation.navigate('Catalog')}>
      <Text style={styles.emptyStateText}>Vous n’avez pas de formation en cours...</Text>
      <NiPrimaryButton caption="Chercher une formation" onPress={() => navigation.navigate('Catalog')} />
      <Image source={require('../../../../../assets/images/aux_detective.webp')} style={styles.emptyStateLearnerImage}
        resizeMode='contain' />
    </TouchableOpacity>
  );
};

export default LearnerEmptyState;
