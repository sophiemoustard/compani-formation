import { useEffect, useMemo, useReducer, useState } from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import AttendanceSheets from '../../../../api/attendanceSheets';
import { RootStackParamList, RootUpdateAttendanceSheetParamList } from '../../../../types/NavigationType';
import { DD_MM_YYYY, HH_MM, LEARNER, LONG_FIRSTNAME_LONG_LASTNAME } from '../../../../core/data/constants';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../../../reducers/error';
import AttendanceSheetSelectionForm from '../../../../components/AttendanceSheetSelectionForm';
import { useGetCourse, useGetGroupedSlotsToBeSigned } from '../../../../store/attendanceSheets/hooks';
import CompaniDate from '../../../../core/helpers/dates/companiDates';
import { ascendingSort } from '../../../../core/helpers/dates/utils';
import { formatPayload } from '../../../../core/helpers/pictures';
import MultipleCheckboxList from '../../../../components/form/MultipleCheckboxList';
import AttendanceSignatureContainer from '../../../../components/AttendanceSignatureContainer';
import AttendanceSheetSummary from '../../../../components/AttendanceSheetSummary';
import AttendanceEndScreen from '../../../../components/AttendanceEndScreen';
import { useGetLoggedUser } from '../../../../store/main/hooks';
import { formatIdentity } from '../../../../core/helpers/utils';
import { generateSignatureFile } from '../helper';

interface UpdateAttendanceSheetProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'UpdateAttendanceSheet'>,
StackScreenProps<RootUpdateAttendanceSheetParamList>
> {}

const SLOTS_SELECTION = 'slots-data-selection';
const ATTENDANCE_SIGNATURE = 'attendance-signature';
const ATTENDANCE_SUMMARY = 'attendance-summary';
const END_SCREEN = 'end-screen';

const UpdateAttendanceSheet = ({ route, navigation }: UpdateAttendanceSheetProps) => {
  const { attendanceSheetId } = route.params;
  const course = useGetCourse();
  const loggedUser = useGetLoggedUser();
  const groupedSlotsToBeSigned = useGetGroupedSlotsToBeSigned();
  const [slotSelectionTitle, setSlotSelectionTitle] = useState<string>('');
  const slotList = Object.values(groupedSlotsToBeSigned).map(group => group.map(s => s._id)).flat();
  const [signature, setSignature] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [traineeName, setTraineeName] = useState<string>('');
  const [failUpload, setFailUpload] = useState<boolean>(false);
  const [errorSignature, dispatchErrorSignature] = useReducer(errorReducer, initialErrorState);
  const [errorConfirmation, dispatchErrorConfirmation] = useReducer(errorReducer, initialErrorState);
  const stepsName = useMemo(() =>
    Object.keys(groupedSlotsToBeSigned), [groupedSlotsToBeSigned]);
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
    if (loggedUser?.identity) setTraineeName(formatIdentity(loggedUser.identity, LONG_FIRSTNAME_LONG_LASTNAME));
  }, [loggedUser]);

  useEffect(() => {
    const trainerName = course?.trainer.identity
      ? formatIdentity(course.trainer.identity, LONG_FIRSTNAME_LONG_LASTNAME)
      : 'Votre formateur';
    setSlotSelectionTitle(`${trainerName} vous demande d'émarger les créneaux suivants : `);
  }, [course]);

  const setConfirmationCheckbox = () => {
    setConfirmation(prevState => !prevState);
    dispatchErrorConfirmation({ type: RESET_ERROR });
  };

  const goToSummary = () => {
    if (!signature) {
      dispatchErrorSignature({ type: SET_ERROR, payload: 'Veuillez signer dans l\'encadré' });
    } else {
      dispatchErrorSignature({ type: RESET_ERROR });
      navigation.navigate(ATTENDANCE_SUMMARY);
    }
  };

  const saveAttendances = async () => {
    try {
      setIsLoading(true);
      const file = generateSignatureFile(signature, course?._id, 'trainee');
      const data = formatPayload({ signature: file });
      await AttendanceSheets.sign(attendanceSheetId, data);
      setIsLoading(false);
    } catch (e) {
      setFailUpload(true);
      console.error(e);
    }
  };

  const saveAndGoToEndScreen = async () => {
    if (!confirmation) {
      dispatchErrorConfirmation({ type: SET_ERROR, payload: 'Veuillez cocher la case ci-dessous' });
    } else {
      dispatchErrorConfirmation({ type: RESET_ERROR });
      await saveAttendances();
      navigation.navigate(END_SCREEN);
    }
  };

  const renderSlotSelection = () => (
    <AttendanceSheetSelectionForm title={slotSelectionTitle} error={initialErrorState}
      goToNextScreen={() => navigation.navigate('attendance-signature')}>
      <MultipleCheckboxList optionsGroups={slotsOptions} groupTitles={stepsName} checkedList={slotList} disabled />
    </AttendanceSheetSelectionForm>
  );

  const renderSignatureContainer = () => (
    <AttendanceSignatureContainer error={errorSignature} goToNextScreen={goToSummary} setSignature={setSignature}
      resetError={() => dispatchErrorSignature({ type: RESET_ERROR })} />
  );

  const renderSummary = () => (
    <AttendanceSheetSummary signature={signature} goToNextScreen={saveAndGoToEndScreen} error={errorConfirmation}
      stepsName={stepsName} isLoading={isLoading} setConfirmation={setConfirmationCheckbox} confirmation={confirmation}
      traineeName={traineeName} slotsOptions={slotsOptions} />
  );
  const renderEndScreen = () => (
    <AttendanceEndScreen goToNextScreen={navigation.goBack} traineeName={traineeName} failUpload={failUpload}
      mode={LEARNER} />
  );

  const Stack = createStackNavigator<RootUpdateAttendanceSheetParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { flex: 1 } }} initialRouteName={SLOTS_SELECTION}>
      <Stack.Screen key={1} name={SLOTS_SELECTION}>{renderSlotSelection}</Stack.Screen>
      <Stack.Screen key={2} name={ATTENDANCE_SIGNATURE}>{renderSignatureContainer}</Stack.Screen>
      <Stack.Screen key={3} name={ATTENDANCE_SUMMARY}>{renderSummary}</Stack.Screen>
      <Stack.Screen options={{ gestureEnabled: false }} key={4} name={END_SCREEN}>{renderEndScreen}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default UpdateAttendanceSheet;
