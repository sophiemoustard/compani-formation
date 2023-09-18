import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT, MARGIN, PADDING } from '../../../styles/metrics';
import { FontType } from '../../../types/FontType';

const styles = (backgroundColor: string, borderColor: string, color: string, font: FontType) => StyleSheet.create({
  button: {
    backgroundColor,
    borderColor,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    minHeight: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    padding: PADDING.MD,
  },
  textButton: {
    color,
    textAlign: 'center',
    ...font,
  },
  icon: {
    marginRight: MARGIN.SM,
  },
});

export default styles;
