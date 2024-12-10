import { ScrollView, View, Text, BackHandler, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import styles from './styles';
import NiPrimaryButton from '../form/PrimaryButton';
import FeatherButton from '../icons/FeatherButton';
import { ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import NiErrorMessage from '../../components/ErrorMessage';
import MultipleCheckboxList from '../form/MultipleCheckboxList';
import { DataOptionsType } from '../../store/attendanceSheets/slice';
import Checkbox from '../form/Checkbox';
import { ErrorStateType } from '../../reducers/error';

interface AttendanceSheetSelectionFormProps {
  goToNextScreen: () => void,
  stepsName: any,
  slotsOptions: DataOptionsType[][],
  signature: string,
  isLoading: boolean,
  setConfirmation: () => void,
  confirmation: boolean,
  error: ErrorStateType,
  traineeName: string,
}

const AttendanceSheetSumary = ({
  goToNextScreen,
  stepsName,
  slotsOptions,
  signature,
  isLoading,
  setConfirmation,
  confirmation,
  error,
  traineeName,
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
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Emargements pour {traineeName}</Text>
      <MultipleCheckboxList optionsGroups={slotsOptions} disabled
        groupTitles={stepsName}
        setOptions={() => {}} checkedList={slotsOptions.flat().map(option => option.value as string)} />
      <Image source={{ uri: signature }} style={styles.image} />
    </ScrollView>
    <View style={styles.checkboxContainer}>
      <Checkbox itemLabel={'Je certifie que les informations ci-dessus sont exactes'} isChecked={confirmation}
        onPressCheckbox={setConfirmation} />
    </View>
    <View style={styles.button}>
      <NiErrorMessage message={error.message} show={error.value} />
      <NiPrimaryButton caption={'Suivant'} onPress={goToNextScreen} loading={isLoading} />
    </View>
  </SafeAreaView>;
};
export default AttendanceSheetSumary;
