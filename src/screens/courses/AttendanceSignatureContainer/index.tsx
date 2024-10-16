import { useEffect, useReducer, useRef, useState } from 'react';
import { BackHandler, View } from 'react-native';
import Signature, { SignatureViewRef } from 'react-native-signature-canvas';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../types/NavigationType';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import { DD_MM_YYYY, HH_MM } from '../../../core/data/constants';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import { ascendingSort } from '../../../core/helpers/dates/utils';
import FeatherButton from '../../../components/icons/FeatherButton';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import NiSecondaryButton from '../../../components/form/SecondaryButton';
import NiErrorMessage from '../../../components/ErrorMessage';
import { useGetLoggedUserId } from '../../../store/main/hooks';
import { formatPayload } from '../../../core/helpers/pictures';
import attendanceSheets from '../../../api/attendanceSheets';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../../reducers/error';
import styles from './styles';

interface AttendanceSignatureContainerProps extends StackScreenProps
<RootStackParamList, 'AttendanceSignatureContainer'>{}

const AttendanceSignatureContainer = ({ route, navigation }: AttendanceSignatureContainerProps) => {
  const { profileId, slots } = route.params;
  const [slotsOptions, setSlotsOptions] = useState<{label: string, value: string}[]>([]);
  const [signature, setSignature] = useState<{slot: string, data: string}>({ slot: '', data: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signatureRef = useRef<SignatureViewRef>(null);
  const userId = useGetLoggedUserId();
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);

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

  const savePicture = async () => {
    try {
      if (signature.slot && signature.data) {
        setIsLoading(true);
        const file = { uri: signature.data, type: 'image/png', name: `signature-${userId}` };
        const data = formatPayload({
          signature: file,
          course: profileId,
          trainee: userId,
          slot: signature.slot,
        });
        await attendanceSheets.upload(data);
        setIsLoading(false);
        setSignature({ slot: '', data: '' });
        signatureRef.current!.clearSignature();
        goBack();
        dispatchError({ type: RESET_ERROR });
      } else {
        dispatchError({ type: SET_ERROR, payload: 'Veuillez signer dans le cadre' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const save = (uri: any) => {
    setSignature(prevSignature => ({ ...prevSignature, data: uri }));
    dispatchError({ type: RESET_ERROR });
  };

  const remove = () => {
    setSignature(prevSignature => ({ ...prevSignature, data: '' }));
  };

  const onEnd = () => {
    signatureRef.current!.readSignature();
  };

  const style = `.m-signature-pad {box-shadow: none; border: none; } 
                .m-signature-pad--body {border: none;}
                .m-signature-pad--footer {display: none; margin: 0px;}
                body,html {
                width: 100%; height: 100%;}`;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FeatherButton name='arrow-left' onPress={goBack} size={ICON.LG} color={GREY[600]} />
      <Picker selectedValue={signature.slot}
        onValueChange={value => setSignature(prevSignature => ({ ...prevSignature, slot: value }))}>
        <Picker.Item key={0} label="Sélectionner un créneau" value={''} />
        {slotsOptions.map(slot => (<Picker.Item key={slot.value} label={slot.label} value={slot.value} />))}
      </Picker>
      <View style={styles.webviewContainer}>
        <Signature webStyle={style} ref={signatureRef} onOK={save} onEnd={onEnd} onClear={remove} onUndo={onEnd}
          onEmpty={remove}/>
      </View>
      <View style={styles.buttonContainer}>
        <NiSecondaryButton caption="Tout effacer" onPress={() => { signatureRef.current!.clearSignature(); }} />
        <NiSecondaryButton caption="Annuler" onPress={() => { signatureRef.current!.undo(); }} />
      </View>
      {!!signature.slot && <NiPrimaryButton caption='Enregistrer la signature' onPress={savePicture}
        loading={isLoading} />}
      <NiErrorMessage message={error.message} show={error.value} />
    </SafeAreaView>
  );
};

export default AttendanceSignatureContainer;
