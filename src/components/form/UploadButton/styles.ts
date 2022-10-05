import { StyleSheet } from 'react-native';
import { GREY } from '../../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT, MARGIN } from '../../../styles/metrics';

const styles = StyleSheet.create({
  button: {
    borderColor: GREY[600],
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: BORDER_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: MARGIN.MD,
  },
  title: {
    ...FIRA_SANS_REGULAR.MD,
  },
});

export default styles;
