import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../styles/metrics';

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
  webviewContainer: {
    height: '50%',
    margin: MARGIN.MD,
    alignSelf: 'center',
    aspectRatio: 1,
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
