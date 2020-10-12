import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BUTTON_HEIGHT, MARGIN, BORDER_WIDTH } from '../../../styles/metrics';
import { FIRA_SANS_BLACK } from '../../../styles/fonts';

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  textButton: {
    ...FIRA_SANS_BLACK.MD,
    marginHorizontal: MARGIN.SM,
  },
});

export default styles;
