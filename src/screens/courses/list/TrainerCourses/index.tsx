import 'array-flat-polyfill';
import { Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../../../../styles/common';
import styles from '../styles';

const TrainerCourses = () => (
  <SafeAreaView style={commonStyles.container} edges={['top']}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={commonStyles.title} testID='header'>Espace intervenant</Text>
      <View style={styles.footer}>
        <Image style={styles.elipse} source={require('../../../../../assets/images/log_out_background.png')} />
        <Image source={require('../../../../../assets/images/pa_aidant_balade_bleu.png')} style={styles.fellow} />
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default TrainerCourses;
