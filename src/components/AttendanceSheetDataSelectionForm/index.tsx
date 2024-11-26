import { ScrollView, View, Text } from 'react-native';
import styles from './styles';
import RadioButtonList from '../form/RadioButtonList';
import NiPrimaryButton from '../form/PrimaryButton';
import NiErrorMessage from '../ErrorMessage';
import { ErrorStateType } from '../../reducers/error';

interface AttendanceSheetDataSelectionFormProps {
  title: string,
  options: { label: string, value: string }[],
  setOption: (value: string) => void,
  goToNextScreen: () => void,
  error: ErrorStateType
}

const AttendanceSheetDataSelectionForm = ({
  title,
  options,
  error,
  setOption,
  goToNextScreen,
}: AttendanceSheetDataSelectionFormProps) => (
  <>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{title}</Text>
      <RadioButtonList options={options} setOption={setOption}/>
    </ScrollView>
    <View style={styles.button}>
      <NiErrorMessage message={error.message} show={error.value}/>
      <NiPrimaryButton caption={'Suivant'} onPress={goToNextScreen}/>
    </View>
  </>
);
export default AttendanceSheetDataSelectionForm;
