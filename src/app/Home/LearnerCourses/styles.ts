import { StyleSheet } from 'react-native';
import { MAIN_MARGIN_LEFT, MARGIN, PADDING } from '@/styles/metrics';
import { GREEN, GREY, PINK, PURPLE, YELLOW } from '@/styles/colors';
import { FIRA_SANS_REGULAR } from '@/styles/fonts';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  courseContainer: {
    paddingHorizontal: MAIN_MARGIN_LEFT,
  },
  nextSteps: {
    backgroundColor: GREY[100],
    paddingVertical: PADDING.XL,
    marginBottom: MARGIN.XL,
  },
  yellowCount: {
    ...FIRA_SANS_REGULAR.SM,
    color: YELLOW[900],
    backgroundColor: YELLOW[200],
  },
  greenCount: {
    ...FIRA_SANS_REGULAR.SM,
    color: GREEN[900],
    backgroundColor: GREEN[200],
  },
  purpleCount: {
    ...FIRA_SANS_REGULAR.SM,
    color: PURPLE[800],
    backgroundColor: PURPLE[200],
  },
  pinkCount: {
    ...FIRA_SANS_REGULAR.SM,
    color: PINK[600],
    backgroundColor: PINK[200],
  },
  leftBackground: {
    resizeMode: 'contain',
    position: 'absolute',
    left: '-70%',
    top: -32,
  },
  rightBackground: {
    resizeMode: 'contain',
    position: 'absolute',
    right: '-70%',
    top: -32,
  },
  sectionContainer: {
    marginVertical: MARGIN.XL,
  },
});

export default styles;
