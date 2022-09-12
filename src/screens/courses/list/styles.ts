import { StyleSheet } from 'react-native';
import { MAIN_MARGIN_LEFT, MARGIN, PADDING, BORDER_WIDTH, BORDER_RADIUS } from '../../../styles/metrics';
import { GREEN, GREY, PINK, PURPLE, YELLOW, TRANSPARENT_GREY, WHITE } from '../../../styles/colors';
import { FIRA_SANS_REGULAR, FIRA_SANS_BOLD } from '../../../styles/fonts';

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
    marginTop: 'auto',
  },
  emptyStateContainer: {
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: BORDER_WIDTH,
    borderColor: TRANSPARENT_GREY,
    overflow: 'hidden',
    backgroundColor: WHITE,
    marginHorizontal: MAIN_MARGIN_LEFT,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 176,
    padding: PADDING.LG,
  },
  emptyStateImage: {
    position: 'absolute',
    right: -160,
    bottom: 8,
    height: 144,
  },
  emptyStateText: {
    ...FIRA_SANS_BOLD.MD,
    textAlign: 'center',
  },
});

export default styles;
