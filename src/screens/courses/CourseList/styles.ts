import { StyleSheet } from 'react-native';
import { MAIN_MARGIN_LEFT } from '../../../styles/metrics';
import { GREEN, PINK, PURPLE, YELLOW } from '../../../styles/colors';
import { FIRA_SANS_BOLD } from '../../../styles/fonts';

const styles = StyleSheet.create({
  courseContainer: {
    paddingHorizontal: MAIN_MARGIN_LEFT,
  },
  separator: {
    marginRight: 8,
  },
  onGoingCoursesCount: {
    ...FIRA_SANS_BOLD.MD,
    color: YELLOW[800],
    backgroundColor: YELLOW[200],
  },
  achievedCoursesCount: {
    ...FIRA_SANS_BOLD.MD,
    color: GREEN[800],
    backgroundColor: GREEN[200],
  },
  subProgramsCount: {
    ...FIRA_SANS_BOLD.MD,
    color: PURPLE[800],
    backgroundColor: PURPLE[200],
  },
  nextEventsCount: {
    ...FIRA_SANS_BOLD.MD,
    color: PINK[600],
    backgroundColor: PINK[100],
  },
});

export default styles;
