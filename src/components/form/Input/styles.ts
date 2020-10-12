import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, MARGIN, PADDING, INPUT_HEIGHT, BORDER_WIDTH } from '../../../styles/metrics';
import { GREY, WHITE } from '../../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';

const styles = StyleSheet.create({
  input: {
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
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
  },
  inputIcon: {
    paddingRight: PADDING.MD,
  },
  innerInput: {
    ...FIRA_SANS_REGULAR.MD,
    flex: 1,
    paddingHorizontal: PADDING.MD,
  },
});

export default styles;
