import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import NiPrimaryButton from '../form/PrimaryButton';

interface AttendanceSheetSelectionFormProps {
  goToNextScreen: () => void,
}

const AttendanceSheetSumary = ({ goToNextScreen }: AttendanceSheetSelectionFormProps) => (
  <SafeAreaView style={styles.safeArea} edges={['top']}>
    <View style={styles.container}>
      <Text style={styles.title}>Une demande d&apos;émargement a été envoyée</Text>
      <Text>Elle est disponible sur la page de sa formation sur son application mobile</Text>
      <Text>
        N&apos;oubliez pas de reporter les émargements dans le tableau prévu à cette effet sur l&apos;application web
        Compani
      </Text>
      <View style={styles.button}>
        <NiPrimaryButton caption={'Terminer'} onPress={goToNextScreen} />
      </View>
    </View>
  </SafeAreaView>
);
export default AttendanceSheetSumary;
