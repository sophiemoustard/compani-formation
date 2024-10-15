import { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/NavigationType';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import { DD_MM_YYYY, HH_MM } from '../../../core/data/constants';
import { ascendingSort } from '../../../core/helpers/dates/utils';

interface AttendanceSignatureContainerProps extends StackScreenProps
<RootStackParamList, 'AttendanceSignatureContainer'>{}

const AttendanceSignatureContainer = ({ route, navigation }: AttendanceSignatureContainerProps) => {
  const { profileId, slots } = route.params;
  const [slotsOptions, setSlotsOptions] = useState<{label: string, value: string}[]>([]);
  const [signature, setSignature] = useState({ slot: null });

  useEffect(() => {
    setSlotsOptions(
      slots
        .sort(ascendingSort('startDate'))
        .map(s => ({
          label: `${CompaniDate(s.startDate).format(DD_MM_YYYY)} - ${CompaniDate(s.startDate).format(HH_MM)}`,
          value: s._id,
        }))
    );
  }, [slots]);

  const goBack = async () => {
    navigation.navigate('LearnerCourseProfile', { courseId: profileId });
  };

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Picker selectedValue={signature.slot}
        onValueChange={value => setSignature(prevSignature => ({ ...prevSignature, slot: value }))}>
        <Picker.Item key={0} label="Sélectionner un créneau" value={null} />
        {slotsOptions.map(slot => (<Picker.Item key={slot.value} label={slot.label} value={slot.value} />))}
      </Picker>
    </View>
  );
};

export default AttendanceSignatureContainer;
