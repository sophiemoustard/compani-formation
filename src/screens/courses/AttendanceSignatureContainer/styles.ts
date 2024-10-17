import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../../styles/metrics';
import { IS_IOS } from '../../../core/data/constants';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    margin: MARGIN.MD,
    paddingBottom: PADDING.LG,
  },
  picker: {
    marginVertical: IS_IOS ? -MARGIN.MD : MARGIN.MD,
    justifyContent: 'center',
  },
  webviewContainer: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 720,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: PADDING.LG,
  },
});

export default styles;
