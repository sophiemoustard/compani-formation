import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import FeatherButton from '../../components/icons/FeatherButton';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import NiSecondaryButton from '../../components/form/SecondaryButton';
import NiErrorMessage from '../../components/ErrorMessage';
import { IS_WEB } from '../../core/data/constants';
import { ErrorStateType } from '../../reducers/error';
import ExitModal from '../ExitModal';
import { htmlContent } from './canvas';
import styles from './styles';

interface AttendanceSignatureContainerProps {
  error: ErrorStateType,
  goToNextScreen: () => void,
  resetError: () => void,
  setSignature: (img: any) => void,
}

const AttendanceSignatureContainer = ({
  error,
  goToNextScreen,
  resetError,
  setSignature,
}: AttendanceSignatureContainerProps) => {
  const navigation = useNavigation();
  const iframeRef = useRef<any>(null);
  const webViewRef = useRef<WebView>(null);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);

  const onMessage = (event: any) => {
    const dataURI = event.nativeEvent.data;
    setSignature(dataURI);
    if (dataURI) resetError();
  };

  const handleIframeMessage = useCallback((event: any) => {
    // eslint-disable-next-line no-undef
    if (event.origin !== window.location.origin && event.origin !== 'null') return;
    const dataURI = event.data;
    setSignature(dataURI);
    if (dataURI) resetError();
  }, [resetError, setSignature]);

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
  }, [handleIframeMessage]);

  const hardwareBackPress = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, []);

  const sendMessageToWebView = (message: string) => {
    webViewRef.current?.injectJavaScript(`handleMessage("${message}"); true;`);
  };

  const sendMessageToIframe = (message: string) => {
    iframeRef.current?.contentWindow.postMessage(message, '*');
  };

  const clearCanvas = () => (IS_WEB ? sendMessageToIframe('clear') : sendMessageToWebView('clear'));

  const undoCanvas = () => (IS_WEB ? sendMessageToIframe('undo') : sendMessageToWebView('undo'));

  const toggleModal = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    setSignature('');
    resetError();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.LG}
          color={GREY[600]} />
        <ExitModal onPressConfirmButton={toggleModal} visible={exitConfirmationModal}
          title="Êtes-vous sûr(e) de cela ?" onPressCancelButton={() => setExitConfirmationModal(false)}
          contentText="Votre signature ne sera pas enregistrée" />
        <View style={styles.webviewContainer}>
          {
            IS_WEB
              ? <iframe
                ref={iframeRef}
                src={`data:text/html,${encodeURIComponent(htmlContent)}`}
                style={{ width: '100%', height: '100%', border: '1px solid #ccc' }}
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
        <View style={styles.footer}>
          <NiErrorMessage message={error.message} show={error.value} />
          <NiPrimaryButton caption='Suivant' onPress={goToNextScreen} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AttendanceSignatureContainer;
