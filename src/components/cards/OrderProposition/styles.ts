import { StyleSheet } from 'react-native';
import { MARGIN, BORDER_WIDTH, BORDER_RADIUS, BUTTON_HEIGHT, ORDERED_ANSWER_MIN_HEIGHT } from '../../../styles/metrics';
import { WHITE, GREY } from '../../../styles/colors';
import { FIRA_SANS_MEDIUM, NUNITO_BLACK } from '../../../styles/fonts';

const styles = (color: string, isValidated: boolean) => StyleSheet.create({
  container: {
    marginBottom: MARGIN.MD,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  indexContainer: {
    height: BUTTON_HEIGHT,
  },
  answerContainer: {
    flex: 1,
  },
  index: {
    flexDirection: 'row',
    height: '100%',
    borderWidth: BORDER_WIDTH,
    borderRightWidth: 0,
    backgroundColor: isValidated ? color : GREY[100],
    borderColor: isValidated ? color : GREY[200],
    borderTopLeftRadius: BORDER_RADIUS.MD,
    borderBottomLeftRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
  },
  answer: {
    minHeight: ORDERED_ANSWER_MIN_HEIGHT,
    borderWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    borderColor: isValidated ? color : GREY[200],
    borderBottomLeftRadius: BORDER_RADIUS.MD,
    borderTopRightRadius: BORDER_RADIUS.MD,
    borderBottomRightRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerText: {
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[800],
    marginVertical: MARGIN.LG / 2,
    marginHorizontal: MARGIN.MD,
  },
  indexText: {
    ...NUNITO_BLACK.XL,
    color: isValidated ? WHITE : GREY[800],
    marginRight: MARGIN.SM,
  },
  answerShadow: {
    backgroundColor: isValidated ? color : GREY[200],
    borderRadius: BORDER_RADIUS.LG,
  },
  indexShadow: {
    backgroundColor: isValidated ? color : GREY[200],
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: BORDER_RADIUS.LG,
    borderTopLeftRadius: BORDER_RADIUS.LG,
  },
});

export default styles;
