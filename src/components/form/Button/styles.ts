import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT, MARGIN } from '../../../styles/metrics';

export interface ButtonStyleType {
  button: object,
  textButton: object,
  icon: object,
}

const styles = (backgroundColor, borderColor, color, font) => StyleSheet.create({
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
    paddingHorizontal: MARGIN.MD,
  },
  textButton: {
    color,
    ...font,
  },
  icon: {
    marginRight: MARGIN.SM,
  },
});

export default styles;
