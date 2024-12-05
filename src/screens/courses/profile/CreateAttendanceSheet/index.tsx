import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import keyBy from 'lodash/keyBy';
import { RootStackParamList, RootCreateAttendanceSheetParamList } from '../../../../types/NavigationType';
import { INTER_B2B, DD_MM_YYYY, HH_MM } from '../../../../core/data/constants';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../../../reducers/error';
import AttendanceSheetSelectionForm from '../../../../components/AttendanceSheetSelectionForm';
import UploadMethods from '../../../../components/UploadMethods';
import {
  useGetCourse,
  useGetMissingAttendanceSheets,
  useGetGroupedSlotsToBeSigned,
} from '../../../../store/attendanceSheets/hooks';
import CompaniDate from '../../../../core/helpers/dates/companiDates';
import { ascendingSort } from '../../../../core/helpers/dates/utils';
import RadioButtonList from '../../../../components/form/RadioButtonList';
import MultipleCheckboxList from '../../../../components/form/MultipleCheckboxList';

interface CreateAttendanceSheetProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'CreateAttendanceSheet'>,
StackScreenProps<RootCreateAttendanceSheetParamList>
> {}

const DATA_SELECTION = 'attendance-sheet-data-selection';
const SLOTS_SELECTION = 'slots-data-selection';
const UPLOAD_METHOD = 'upload-method-selection';

const CreateAttendanceSheet = ({ route, navigation }: CreateAttendanceSheetProps) => {
  const { isSingle } = route.params;
  const course = useGetCourse();
  const missingAttendanceSheets = useGetMissingAttendanceSheets();
  const groupedSlotsToBeSigned = useGetGroupedSlotsToBeSigned();
  const [title, setTitle] = useState<string>('');
  const [attendanceSheetToAdd, setAttendanceSheetToAdd] = useState<string>('');
  const [slotsToAdd, setSlotsToAdd] = useState<string[]>([]);
  const [errorData, dispatchErrorData] = useReducer(errorReducer, initialErrorState);
  const [errorSlots, dispatchErrorSlots] = useReducer(errorReducer, initialErrorState);
  const stepsById = useMemo(() => keyBy(course?.subProgram.steps, '_id'), [course]);
  const stepsName = useMemo(() =>
    Object.keys(groupedSlotsToBeSigned).map(stepId => (stepsById[stepId].name)),
  [groupedSlotsToBeSigned, stepsById]);
  const slotsOptions = useMemo(() =>
    Object.values(groupedSlotsToBeSigned)
      .map(slotGroup => [...slotGroup]
        .sort(ascendingSort('startDate'))
        .map(slot => ({
          label:
        `${CompaniDate(slot.startDate).format(`${DD_MM_YYYY} ${HH_MM}`)} - ${CompaniDate(slot.endDate).format(HH_MM)}`,
          value: slot._id,
        }))),
  [groupedSlotsToBeSigned]);

  useEffect(() => {
    setTitle(
      course?.type === INTER_B2B
        ? 'Pour quel stagiaire souhaitez-vous charger une feuille d\'émargement ?'
        : 'Pour quelle date souhaitez-vous charger une feuille d\'émargement ?'
    );
  }, [course]);

  const setDataOption = useCallback((option: string) => {
    setAttendanceSheetToAdd(option);
    if (option) dispatchErrorData({ type: RESET_ERROR });
  }, []);

  const setSlotOptions = useCallback((options: string[]) => {
    setSlotsToAdd(options);
    if (options.length) dispatchErrorSlots({ type: RESET_ERROR });
  }, []);

  const goToUploadMethod = () => {
    if (isSingle && !slotsToAdd.length) {
      dispatchErrorSlots({ type: SET_ERROR, payload: 'Veuillez sélectionner des créneaux' });
    } else if (!attendanceSheetToAdd) {
      dispatchErrorData({
        type: SET_ERROR,
        payload: course?.type === INTER_B2B ? 'Veuillez sélectionner un stagiaire' : 'Veuillez sélectionner une date',
      });
    } else {
      dispatchErrorData({ type: RESET_ERROR });
      navigation.navigate(UPLOAD_METHOD);
    }
  };

  const goToSlotSelection = () => {
    if (!attendanceSheetToAdd) {
      dispatchErrorData({ type: SET_ERROR, payload: 'Veuillez sélectionner un stagiaire' });
    } else {
      dispatchErrorData({ type: RESET_ERROR });
      navigation.navigate(SLOTS_SELECTION);
    }
  };

  const renderDataSelection = () => (
    <AttendanceSheetSelectionForm title={title} error={errorData}
      goToNextScreen={isSingle ? goToSlotSelection : goToUploadMethod}>
      <RadioButtonList options={missingAttendanceSheets} setOption={setDataOption}
        checkedRadioButton={attendanceSheetToAdd} />
    </AttendanceSheetSelectionForm>
  );

  const renderSlotSelection = () => (
    <AttendanceSheetSelectionForm title={'Pour quels créneaux souhaitez-vous charger une feuille d\'émargement ?'}
      error={errorSlots} goToNextScreen={goToUploadMethod}>
      <MultipleCheckboxList optionsGroups={slotsOptions} groupTitles={stepsName} setOptions={setSlotOptions}
        checkedList={slotsToAdd}/>
    </AttendanceSheetSelectionForm>
  );

  const renderUploadMethod = () => (
    <UploadMethods course={course!} goToParent={navigation.goBack} attendanceSheetToAdd={attendanceSheetToAdd}
      slotsToAdd={slotsToAdd} />
  );

  const Stack = createStackNavigator<RootCreateAttendanceSheetParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={DATA_SELECTION}>
      <Stack.Screen key={0} name={DATA_SELECTION}>{renderDataSelection}</Stack.Screen>
      {isSingle && <Stack.Screen key={1} name={SLOTS_SELECTION}>{renderSlotSelection}</Stack.Screen>}
      <Stack.Screen key={2} name={UPLOAD_METHOD}>{renderUploadMethod}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default CreateAttendanceSheet;
