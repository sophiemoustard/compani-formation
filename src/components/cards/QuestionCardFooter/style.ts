import { StyleSheet } from 'react-native';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';
import { BUTTON_HEIGHT, MARGIN } from '../../../styles/metrics';
import { WHITE } from '../../../styles/colors';

const styles = (arrowButtonVisible: boolean) => StyleSheet.create({
  container: {
    minHeight: BUTTON_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: MARGIN.XL,
    marginHorizontal: MARGIN.LG,
  },
  button: {
    flexGrow: 1,
    marginLeft: arrowButtonVisible ? MARGIN.LG : 0,
  },
  text: {
    ...FIRA_SANS_MEDIUM.LG,
    color: WHITE,
  },
});

export default styles;
