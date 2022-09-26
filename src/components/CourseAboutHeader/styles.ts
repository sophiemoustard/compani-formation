import { StyleSheet } from 'react-native';
import { PINK, WHITE } from '../../styles/colors';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BLACK, NUNITO_SEMI } from '../../styles/fonts';

const styles = StyleSheet.create({
  content: {
    marginTop: MARGIN.MD,
    marginHorizontal: MARGIN.MD,
    minHeight: 200,
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: PINK[600],
    height: 200,
  },
  titleContainer: {
    marginTop: MARGIN.LG,
  },
  screenTitle: {
    ...NUNITO_SEMI.MD,
    color: PINK[200],
  },
  courseTitle: {
    ...FIRA_SANS_BLACK.XL,
    color: WHITE,
  },
});

export default styles;
