import { ScrollView, View, Text, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import styles from './styles';
import NiPrimaryButton from '../form/PrimaryButton';
import FeatherButton from '../icons/FeatherButton';
import { ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import NiImage from '../Image';
import MultipleCheckboxList from '../form/MultipleCheckboxList';
import { DataOptionsType } from '../../store/attendanceSheets/slice';

interface AttendanceSheetSelectionFormProps {
  goToNextScreen: () => void,
  stepsName: any,
  slotsOptions: DataOptionsType[][],
  signature: string,
  isLoading: boolean,
}

const AttendanceSheetSumary = ({
  goToNextScreen,
  stepsName,
  slotsOptions,
  signature,
  isLoading,
}: AttendanceSheetSelectionFormProps) => {
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
      <Text style={styles.title}>Emargements</Text>
      <MultipleCheckboxList optionsGroups={slotsOptions} disabled
        groupTitles={stepsName}
        setOptions={() => {}} checkedList={slotsOptions.flat().map(option => option.value)} />
      <NiImage source={{ uri: signature }} imgHeight={200} onPress={() => {}}/>
    </ScrollView>
    <View style={styles.button}>
      <NiPrimaryButton caption={'Suivant'} onPress={goToNextScreen} loading={isLoading} />
    </View>
  </SafeAreaView>;
};
export default AttendanceSheetSumary;
