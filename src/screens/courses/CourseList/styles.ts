import { StyleSheet } from 'react-native';
import { MAIN_MARGIN_LEFT, MARGIN, PADDING } from '../../../styles/metrics';
import { GREEN, GREY, PINK, PURPLE, YELLOW } from '../../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';

const styles = StyleSheet.create({
  courseContainer: {
    paddingHorizontal: MAIN_MARGIN_LEFT,
  },
  nextSteps: {
    backgroundColor: GREY[100],
    paddingVertical: PADDING.XL,
    marginBottom: MARGIN.XL,
  },
  onGoingCoursesCount: {
    ...FIRA_SANS_REGULAR.SM,
    color: YELLOW[900],
    backgroundColor: YELLOW[200],
  },
  achievedCoursesCount: {
    ...FIRA_SANS_REGULAR.SM,
    color: GREEN[900],
    backgroundColor: GREEN[200],
  },
  subProgramsCount: {
    ...FIRA_SANS_REGULAR.SM,
    color: PURPLE[800],
    backgroundColor: PURPLE[200],
  },
  nextEventsCount: {
    ...FIRA_SANS_REGULAR.SM,
    color: PINK[600],
    backgroundColor: PINK[200],
  },
  onGoingAndDraftBackground: {
    resizeMode: 'contain',
    position: 'absolute',
    left: -208,
    top: -32,
  },
  achievedBackground: {
    resizeMode: 'contain',
    position: 'absolute',
    right: -264,
    top: -32,
  },
  sectionContainer: {
    marginVertical: MARGIN.XL,
  },
  elipse: {
    width: '100%',
    position: 'absolute',
    top: 64,
    resizeMode: 'contain',
  },
  fellow: {
    width: 152,
    height: 168,
    marginVertical: MARGIN.XL,
  },
  footer: {
    alignItems: 'center',
  },
});

export default styles;
