import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: { flex: 1, margin: MARGIN.MD },
  webviewContainer: { height: '50%' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: PADDING.LG },
});

export default styles;
