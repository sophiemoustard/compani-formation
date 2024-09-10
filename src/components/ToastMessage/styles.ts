import { StyleSheet } from 'react-native';
import { ORANGE, WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { BORDER_RADIUS, MARGIN, PADDING, SCREEN_HEIGHT } from '../../styles/metrics';

const TOAST_MESSAGE_HEIGHT = 56;
const TOAST_OFFSET = TOAST_MESSAGE_HEIGHT + MARGIN.XL;
const TOAST_POSITION = SCREEN_HEIGHT - TOAST_OFFSET;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    paddingHorizontal: MARGIN.MD,
    top: TOAST_POSITION,
  },
  content: {
    backgroundColor: ORANGE[600],
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD,
    height: TOAST_MESSAGE_HEIGHT,
    paddingHorizontal: PADDING.LG,
  },
  text: {
    ...FIRA_SANS_MEDIUM.SM,
    color: WHITE,
    paddingLeft: PADDING.LG,
  },
});

export default styles;
export { TOAST_OFFSET };
