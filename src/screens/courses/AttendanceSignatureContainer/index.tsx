import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/NavigationType';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import { DD_MM_YYYY, HH_MM, IS_WEB } from '../../../core/data/constants';
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
  const iframeRef = useRef<any>(null);
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
            var ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
          }
          window.onresize = resizeCanvas;
          resizeCanvas();
          
          var signaturePad = new SignaturePad(canvas);

          function clearSignature() {
            signaturePad.clear();
            if (${IS_WEB}) window.parent.postMessage('', "*");
            else window.ReactNativeWebView.postMessage('');
          }

          function undoSignature() {
            var data = signaturePad.toData();
            if (data) {
              data.pop();
              signaturePad.fromData(data);
              if (signaturePad.isEmpty()) {
                signaturePad.clear();
                if (${IS_WEB}) window.parent.postMessage('', "*");
                else window.ReactNativeWebView.postMessage('');
              } else {
                var dataUrl = signaturePad.toDataURL('image/png');
                if (${IS_WEB}) window.parent.postMessage(dataUrl, "*");
                else window.ReactNativeWebView.postMessage(dataUrl);
              }
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
            if (${IS_WEB}) window.parent.postMessage(dataUrl, "*");
            else window.ReactNativeWebView.postMessage(dataUrl);
          });
          window.addEventListener('message', (event) => handleMessage(event.data));
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

  const handleIframeMessage = (event: any) => {
    // eslint-disable-next-line no-undef
    if (event.origin !== window.location.origin && event.origin !== 'null') return;
    const dataURI = event.data;
    setSignature(prevSignature => ({ ...prevSignature, data: dataURI }));
    if (dataURI) {
      dispatchError({ type: RESET_ERROR });
    }
  };

  useEffect(() => {
    if (IS_WEB) {
      // eslint-disable-next-line no-undef
      window.addEventListener('message', handleIframeMessage);
    }
    return () => {
      if (IS_WEB) {
        // eslint-disable-next-line no-undef
        window.removeEventListener('message', handleIframeMessage);
      }
    };
  }, []);

  const goBack = useCallback(() => {
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

  const sendMessageToIframe = (message: string) => {
    iframeRef.current?.contentWindow.postMessage(message, '*');
  };

  const base64ToBlob = (base64Data: string, contentType: string) => {
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const savePicture = async () => {
    try {
      if (signature.slot && signature.data) {
        setIsLoading(true);
        let file;
        const contentType = 'image/png';
        if (IS_WEB) {
          const blob = base64ToBlob(signature.data, contentType);
          file = new File([blob], `signature-${userId}.png`, { type: contentType });
        } else file = { uri: signature.data, type: contentType, name: `signature-${userId}` };
        const data = formatPayload({
          signature: file,
          course: profileId,
          trainee: userId,
          slot: signature.slot,
        });
        await attendanceSheets.upload(data);
        setIsLoading(false);
        setSignature({ slot: '', data: '' });
        if (IS_WEB) sendMessageToIframe('clear');
        else sendMessageToWebView('clear');
        goBack();
        dispatchError({ type: RESET_ERROR });
      } else {
        dispatchError({ type: SET_ERROR, payload: 'Veuillez signer dans le cadre' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const clearCanvas = () => (IS_WEB ? sendMessageToIframe('clear') : sendMessageToWebView('clear'));

  const undoCanvas = () => (IS_WEB ? sendMessageToIframe('undo') : sendMessageToWebView('undo'));

  return (
    <View style={styles.container}>
      <Picker selectedValue={signature.slot}
        onValueChange={value => setSignature(prevSignature => ({ ...prevSignature, slot: value }))}>
        <Picker.Item key={0} label="Sélectionner un créneau" value={''} />
        {slotsOptions.map(slot => (<Picker.Item key={slot.value} label={slot.label} value={slot.value} />))}
      </Picker>
      <View style={styles.webviewContainer}>
        {
          IS_WEB
            ? <iframe
              ref={iframeRef}
              src={`data:text/html,${encodeURIComponent(htmlContent)}`}
              style={{ width: '100%', height: 400, border: '1px solid #ccc' }}
            />
            : <WebView
              ref={webViewRef}
              source={{ html: htmlContent, baseUrl: '' }}
              onMessage={onMessage}
              javaScriptEnabled
              originWhitelist={['*']}
            />
        }
      </View>
      <View style={styles.buttonContainer}>
        <NiSecondaryButton caption="Tout effacer" onPress={clearCanvas} />
        <NiSecondaryButton caption="Annuler" onPress={undoCanvas} />
      </View>
      {!!signature.slot && <NiPrimaryButton caption='Enregistrer la signature' onPress={savePicture}
        loading={isLoading} />}
      <NiErrorMessage message={error.message} show={error.value} />
    </View>
  );
};

export default AttendanceSignatureContainer;
