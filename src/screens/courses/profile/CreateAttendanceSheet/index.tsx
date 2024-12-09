import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import keyBy from 'lodash/keyBy';
import AttendanceSheets from '../../../../api/attendanceSheets';
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
import { formatPayload } from '../../../../core/helpers/pictures';
import RadioButtonList from '../../../../components/form/RadioButtonList';
import MultipleCheckboxList from '../../../../components/form/MultipleCheckboxList';
import AttendanceSignatureContainer from '../../../../components/AttendanceSignatureContainer';
import AttendanceSheetSumary from '../../../../components/AttendanceSheetSummary';
import AttendanceEndScreen from '../../../../components/AttendanceEndScreen';

interface CreateAttendanceSheetProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'CreateAttendanceSheet'>,
StackScreenProps<RootCreateAttendanceSheetParamList>
> {}

const DATA_SELECTION = 'attendance-sheet-data-selection';
const SLOTS_SELECTION = 'slots-data-selection';
const UPLOAD_METHOD = 'upload-method-selection';
const ATTENDANCE_SIGNATURE = 'attendance-signature';
const ATTENDANCE_SUMARY = 'attendance-sumary';
const END_SCREEN = 'end-screen';

const CreateAttendanceSheet = ({ route, navigation }: CreateAttendanceSheetProps) => {
  const { isSingle } = route.params;
  const course = useGetCourse();
  const missingAttendanceSheets = useGetMissingAttendanceSheets();
  const groupedSlotsToBeSigned = useGetGroupedSlotsToBeSigned();
  const [title, setTitle] = useState<string>('');
  const [attendanceSheetToAdd, setAttendanceSheetToAdd] = useState<string>('');
  const [slotsToAdd, setSlotsToAdd] = useState<string[]>([]);
  const [signature, setSignature] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorData, dispatchErrorData] = useReducer(errorReducer, initialErrorState);
  const [errorSlots, dispatchErrorSlots] = useReducer(errorReducer, initialErrorState);
  const [errorSignature, dispatchErrorSignature] = useReducer(errorReducer, initialErrorState);
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

  const goToSumary = () => {
    if (!signature) {
      dispatchErrorSignature({ type: SET_ERROR, payload: 'Veuillez signer dans l\'encadré' });
    } else {
      dispatchErrorSignature({ type: RESET_ERROR });
      navigation.navigate(ATTENDANCE_SUMARY);
    }
  };

  const saveAttendances = async () => {
    try {
      setIsLoading(true);
      const contentType = 'image/png';
      const file = { uri: signature, type: contentType, name: `trainer_signature_${course?._id}` };
      const data = formatPayload({
        signature: file,
        course: course?._id,
        trainee: attendanceSheetToAdd,
        slots: slotsToAdd,
      });
      await AttendanceSheets.upload(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const saveAndGoToEndScreen = async () => {
    await saveAttendances();
    navigation.navigate(END_SCREEN);
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

  const renderSignatureContainer = () => (
    <AttendanceSignatureContainer error={errorSignature} goToNextScreen={goToSumary} setSignature={setSignature}
      resetError={() => dispatchErrorSignature({ type: RESET_ERROR })} />
  );

  const renderSumary = () => (
    <AttendanceSheetSumary signature={signature} goToNextScreen={saveAndGoToEndScreen}
      stepsName={stepsName} isLoading={isLoading}
      slotsOptions={slotsOptions
        .map(group => group.filter(opt => slotsToAdd.includes(opt.value))).filter(g => g.length)} />
  );
  const renderEndScreen = () => (
    <AttendanceEndScreen goToNextScreen={navigation.goBack} />
  );

  const Stack = createStackNavigator<RootCreateAttendanceSheetParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={DATA_SELECTION}>
      <Stack.Screen key={0} name={DATA_SELECTION}>{renderDataSelection}</Stack.Screen>
      {isSingle && <Stack.Screen key={1} name={SLOTS_SELECTION}>{renderSlotSelection}</Stack.Screen>}
      <Stack.Screen key={2} name={UPLOAD_METHOD}>{renderUploadMethod}</Stack.Screen>
      <Stack.Screen key={3} name={ATTENDANCE_SIGNATURE}>{renderSignatureContainer}</Stack.Screen>
      <Stack.Screen key={4} name={ATTENDANCE_SUMARY}>{renderSumary}</Stack.Screen>
      <Stack.Screen key={5} name={END_SCREEN}>{renderEndScreen}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default CreateAttendanceSheet;
