import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT, MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_BLACK } from '../../../styles/fonts';

export interface ButtonStyleType {
  button: object,
  textButton: object,
}

const styles = (backgroundColor, borderColor, color) => StyleSheet.create({
  button: {
    backgroundColor,
    borderColor,
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
    color,
    ...FIRA_SANS_BLACK.MD,
    marginHorizontal: MARGIN.SM,
  },
});

export default styles;
