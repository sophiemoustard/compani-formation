import { StyleSheet } from 'react-native';
import { FIRA_SANS_BOLD, NUNITO_LIGHT } from '../../../../styles/fonts';
import { GREY, PINK, WHITE } from '../../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, IS_LARGE_SCREEN, MARGIN, PADDING } from '../../../../styles/metrics';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  container: {
    marginHorizontal: MARGIN.LG,
    marginVertical: IS_LARGE_SCREEN ? MARGIN.XXL : MARGIN.LG,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  contentContainer: {
    width: '100%',
    flexGrow: 1,
  },
  flipCard: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: PADDING.LG,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: WHITE,
    backfaceVisibility: 'hidden',
  },
  question: {
    ...FIRA_SANS_BOLD.LG,
    color: GREY[800],
    textAlign: 'center',
    alignSelf: 'center',
  },
  questionWatermark: {
    ...NUNITO_LIGHT.XXXL,
    alignSelf: 'center',
    position: 'absolute',
    color: PINK[100],
  },
  flipCardBack: {
    backgroundColor: PINK[400],
    borderColor: PINK[500],
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
  },
  answer: {
    ...FIRA_SANS_BOLD.LG,
    color: WHITE,
    textAlign: 'center',
  },
  answerWatermark: {
    ...NUNITO_LIGHT.XXXL,
    alignSelf: 'center',
    position: 'absolute',
    color: PINK[500],
  },
  shadow: {
    backgroundColor: GREY[200],
    borderRadius: BORDER_RADIUS.LG,
  },

});

export default styles;
