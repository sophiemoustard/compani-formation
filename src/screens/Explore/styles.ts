import { StyleSheet } from 'react-native';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { MAIN_MARGIN_LEFT, MARGIN } from '../../styles/metrics';
import { YELLOW } from '../../styles/colors';

export default StyleSheet.create({
  coursesCount: {
    ...FIRA_SANS_BOLD.MD,
    color: YELLOW[800],
  },
  coursesCountContainer: {
    backgroundColor: YELLOW[200],
  },
  courseContainer: {
    paddingHorizontal: MAIN_MARGIN_LEFT,
  },
  separator: {
    marginRight: MARGIN.SM,
  },
});
