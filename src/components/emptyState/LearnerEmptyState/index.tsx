import { Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import NiPrimaryButton from '@/components/form/PrimaryButton';
import styles from '../styles';

const LearnerEmptyState = () => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.emptyStateContainer} onPress={() => router.navigate('Home/Catalog')}>
      <Text style={styles.emptyStateText}>Vous n’avez pas de formation en cours...</Text>
      <NiPrimaryButton caption="Chercher une formation" onPress={() => router.navigate('Home/Catalog')} />
      <Image source={require('../../../../assets/images/aux_detective.webp')} style={styles.emptyStateLearnerImage}
        resizeMode='contain' />
    </TouchableOpacity>
  );
};

export default LearnerEmptyState;
