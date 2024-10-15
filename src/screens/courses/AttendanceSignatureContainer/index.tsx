import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/NavigationType';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import { DD_MM_YYYY, HH_MM } from '../../../core/data/constants';
import { ascendingSort } from '../../../core/helpers/dates/utils';
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
  const webViewRef = useRef<WebView>(null);
  const userId = useGetLoggedUserId();
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);

  const htmlContent = `
    <html>
      <head>
        <style>
          .wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .signature-pad {
            position: absolute;
            left: 0;
            top: 0;
            width:100%;
            height:100%;
            background-color: white;
          }
        </style>
        <script src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
      </head>
      <body>
        <div class="wrapper">
          <canvas id="signature-pad" class="signature-pad"></canvas>
        </div>
        <script>
          var canvas = document.getElementById('signature-pad');
          function resizeCanvas() {
            var ratio =  Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
          }
          window.onresize = resizeCanvas;
          resizeCanvas();
          
          var signaturePad = new SignaturePad(canvas);

          function clearSignature() {
            signaturePad.clear();
            window.ReactNativeWebView.postMessage('');
          }

          function undoSignature() {
            var data = signaturePad.toData();
            if (data) {
              data.pop(); // remove the last dot or line
              signaturePad.fromData(data);
              var dataUrl = signaturePad.toDataURL('image/png');
              window.ReactNativeWebView.postMessage(dataUrl);
            }
          }

          function handleMessage(message) {
            if (message === 'clear') {
              clearSignature();
            } else if (message === 'undo') {
              undoSignature();
            }
          }

          signaturePad.addEventListener('endStroke', function () {
            var dataUrl = signaturePad.toDataURL('image/png');
            window.ReactNativeWebView.postMessage(dataUrl);
          });
          document.addEventListener('message', (event) => handleMessage(event.data));
        </script>
      </body>
    </html>
  `;

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

  const onMessage = (event: any) => {
    const dataURI = event.nativeEvent.data;
    setSignature(prevSignature => ({ ...prevSignature, data: dataURI }));
    if (dataURI) {
      dispatchError({ type: RESET_ERROR });
    }
  };

  const goBack = useCallback(async () => {
    navigation.navigate('LearnerCourseProfile', { courseId: profileId });
  }, [navigation, profileId]);

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessageToWebView = (message: string) => {
    webViewRef.current?.injectJavaScript(`handleMessage("${message}"); true;`);
  };

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
        sendMessageToWebView('clear');
        goBack();
        dispatchError({ type: RESET_ERROR });
      } else {
        dispatchError({ type: SET_ERROR, payload: 'Veuillez signer dans le cadre' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Picker selectedValue={signature.slot}
        onValueChange={value => setSignature(prevSignature => ({ ...prevSignature, slot: value }))}>
        <Picker.Item key={0} label="Sélectionner un créneau" value={''} />
        {slotsOptions.map(slot => (<Picker.Item key={slot.value} label={slot.label} value={slot.value} />))}
      </Picker>
      <View style={styles.webviewContainer}>
        <WebView
          ref={webViewRef}
          source={{ html: htmlContent, baseUrl: '' }}
          onMessage={onMessage}
          javaScriptEnabled
          originWhitelist={['*']}
        />
      </View>
      <View style={styles.buttonContainer}>
        <NiSecondaryButton caption="Tout effacer" onPress={() => sendMessageToWebView('clear')} />
        <NiSecondaryButton caption="Annuler" onPress={() => sendMessageToWebView('undo')} />
      </View>
      {signature.slot && <NiPrimaryButton caption='Enregistrer la signature' onPress={savePicture}
        loading={isLoading} />}
      <NiErrorMessage message={error.message} show={error.value} />
    </View>
  );
};

export default AttendanceSignatureContainer;
