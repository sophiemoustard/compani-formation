import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, MARGIN, PADDING, INPUT_HEIGHT, BORDER_WIDTH } from '../../../styles/metrics';
import { GREY, ORANGE, PINK, TRANSPARENT_PINK, WHITE } from '../../../styles/colors';
import { FIRA_SANS_REGULAR, FIRA_SANS_MEDIUM, FIRA_SANS_ITALIC } from '../../../styles/fonts';

const styles = (isSelected: boolean) => StyleSheet.create({
  container: {
    marginVertical: MARGIN.SM,
  },
  input: {
    borderWidth: BORDER_WIDTH,
    borderColor: isSelected ? PINK[500] : GREY[600],
    height: INPUT_HEIGHT,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: WHITE,
  },
  text: {
    ...FIRA_SANS_REGULAR.SM,
    marginBottom: MARGIN.XS,
    color: GREY[600],
  },
  inputIcon: {
    paddingRight: PADDING.MD,
  },
  innerInput: {
    ...FIRA_SANS_MEDIUM.MD,
    flex: 1,
    paddingHorizontal: PADDING.MD,
  },
  shadow: {
    backgroundColor: TRANSPARENT_PINK,
    top: -3,
    bottom: -3,
    right: -3,
    left: -3,
    borderRadius: BORDER_RADIUS.MD,
  },
  unvalid: {
    ...FIRA_SANS_ITALIC.SM,
    color: ORANGE[600],
    marginTop: MARGIN.XXS,
  },
});

export default styles;
