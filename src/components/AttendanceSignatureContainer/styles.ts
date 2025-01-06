import { StyleSheet } from 'react-native';
import { BORDER_WIDTH, IS_DESKTOP_SCREEN, MARGIN, PADDING } from '../../styles/metrics';
import { BLACK } from '../../styles/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    margin: MARGIN.MD,
    paddingBottom: PADDING.LG,
    flex: 1,
    justifyContent: 'center',
  },
  iframeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iframeContent: {
    width: IS_DESKTOP_SCREEN ? '30%' : '100%',
    marginTop: MARGIN.MD,
    height: 'auto',
    aspectRatio: 1,
    borderWidth: BORDER_WIDTH,
    borderColor: BLACK,
  },
  webviewContainer: {
    height: '50%',
    margin: MARGIN.MD,
    alignSelf: 'center',
    aspectRatio: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: PADDING.LG,
  },
  button: {
    marginHorizontal: MARGIN.MD,
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default styles;
