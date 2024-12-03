import { ScrollView, View, Text, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import styles from './styles';
import NiPrimaryButton from '../form/PrimaryButton';
import NiErrorMessage from '../ErrorMessage';
import { ErrorStateType } from '../../reducers/error';
import FeatherButton from '../icons/FeatherButton';
import { ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';

interface AttendanceSheetDataSelectionFormProps {
  title: string,
  goToNextScreen: () => void,
  error: ErrorStateType,
  children: any,
}

const AttendanceSheetDataSelectionForm = ({
  title,
  goToNextScreen,
  error,
  children,
}: AttendanceSheetDataSelectionFormProps) => {
  const navigation = useNavigation();

  const hardwareBackPress = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  return <SafeAreaView style={styles.safeArea} edges={['top']}>
    <View style={styles.header}>
      <FeatherButton name='arrow-left' onPress={() => navigation.goBack()} size={ICON.MD} color={GREY[600]} />
    </View>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </ScrollView>
    <View style={styles.button}>
      <NiErrorMessage message={error.message} show={error.value}/>
      <NiPrimaryButton caption={'Suivant'} onPress={goToNextScreen}/>
    </View>
  </SafeAreaView>;
};
export default AttendanceSheetDataSelectionForm;
