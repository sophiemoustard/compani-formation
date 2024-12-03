import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import keyBy from 'lodash/keyBy';
import { RootStackParamList, RootCreateAttendanceSheetParamList } from '../../../../types/NavigationType';
import { INTER_B2B, DD_MM_YYYY, HH_MM } from '../../../../core/data/constants';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../../../reducers/error';
import AttendanceSheetDataSelectionForm from '../../../../components/AttendanceSheetDataSelectionForm';
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

type SCREEN_TYPE = typeof DATA_SELECTION | typeof SLOTS_SELECTION | typeof UPLOAD_METHOD;

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

  const setOption = useCallback((option: string) => {
    setAttendanceSheetToAdd(option);
    if (option) dispatchErrorData({ type: RESET_ERROR });
  }, []);

  const setOptions = useCallback((options: string[]) => {
    setSlotsToAdd(options);
    if (options.length) dispatchErrorSlots({ type: RESET_ERROR });
  }, []);

  const go = ({ from, to }: {from: SCREEN_TYPE, to: SCREEN_TYPE}) => {
    if (from === DATA_SELECTION && !attendanceSheetToAdd) {
      dispatchErrorData({
        type: SET_ERROR,
        payload: course?.type === INTER_B2B ? 'Veuillez sélectionner un stagiaire' : 'Veuillez sélectionner une date',
      });
    } else if (from === SLOTS_SELECTION && !slotsToAdd.length) {
      dispatchErrorSlots({
        type: SET_ERROR,
        payload: 'Veuillez sélectionner des créneaux',
      });
    } else {
      if (from === DATA_SELECTION) dispatchErrorData({ type: RESET_ERROR });
      if (from === SLOTS_SELECTION) dispatchErrorSlots({ type: RESET_ERROR });
      navigation.navigate(to);
    }
  };

  const renderDataSelection = () => (
    <AttendanceSheetDataSelectionForm title={title} error={errorData}
      goToNextScreen={() => go({ from: DATA_SELECTION, to: isSingle ? SLOTS_SELECTION : UPLOAD_METHOD })}>
      <RadioButtonList options={missingAttendanceSheets} setOption={setOption}
        checkedRadioButton={attendanceSheetToAdd} />
    </AttendanceSheetDataSelectionForm>
  );

  const renderSlotSelection = () => (
    <AttendanceSheetDataSelectionForm title={'Pour quels créneaux souhaitez-vous charger une feuille d\'émargement ?'}
      error={errorSlots} goToNextScreen={() => go({ from: SLOTS_SELECTION, to: UPLOAD_METHOD })}>
      <MultipleCheckboxList optionsGroups={slotsOptions} groupTitles={stepsName} setOptions={setOptions}
        checkedList={slotsToAdd}/>
    </AttendanceSheetDataSelectionForm>
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
