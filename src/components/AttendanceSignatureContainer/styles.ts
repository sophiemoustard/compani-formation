import { StyleSheet } from 'react-native';
import { IS_DESKTOP_SCREEN, MARGIN, PADDING } from '../../styles/metrics';

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
  webviewContainer: {
    height: '50%',
    width: IS_DESKTOP_SCREEN ? '50%' : 'auto',
    ...IS_DESKTOP_SCREEN && { alignSelf: 'center' },
    margin: MARGIN.MD,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: PADDING.LG,
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default styles;
