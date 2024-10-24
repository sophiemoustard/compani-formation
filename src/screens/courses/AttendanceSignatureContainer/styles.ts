import { StyleSheet } from 'react-native';
import { BUTTON_HEIGHT, IS_DESKTOP_SCREEN, MARGIN, PADDING, TEXT_LINE_HEIGHT } from '../../../styles/metrics';
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
    ...IS_IOS && { height: '20%' },
  },
  webviewContainer: {
    aspectRatio: 1,
    height: IS_DESKTOP_SCREEN ? '100%' : '55%',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: PADDING.LG,
  },
  footer: {
    minHeight: BUTTON_HEIGHT + TEXT_LINE_HEIGHT,
  },
});

export default styles;
