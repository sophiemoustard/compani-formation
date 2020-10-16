import { StyleSheet } from 'react-native';
import { GREY, WHITE } from '../../../styles/colors';
import {
  BORDER_RADIUS,
  MARGIN,
  BORDER_WIDTH,
  PADDING,
} from '../../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';

const styles = (color: string, isGoodAnswer: boolean, isSelected: boolean,
  isValidated: boolean, isGap: boolean) => StyleSheet.create({
  shadow: {
    backgroundColor: (isValidated && isGap) && (isSelected || isGoodAnswer) ? color : GREY[200],
    borderRadius: BORDER_RADIUS.MD,
  },
  answersContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  answerContainer: {
    height: 40,
  },
  textContainer: {
    backgroundColor: WHITE,
    borderWidth: BORDER_WIDTH,
    borderColor: isValidated && (isSelected || isGoodAnswer) ? color : GREY[200],
    borderRadius: BORDER_RADIUS.MD,
    flex: 1,
  },
  answer: {
    ...FIRA_SANS_MEDIUM.MD,
    padding: PADDING.MD,
    textAlign: 'center',
    color: isValidated && (isSelected || isGoodAnswer) ? color : GREY[800],
  },
  empty: {
    backgroundColor: GREY[200],
    borderRadius: BORDER_RADIUS.MD,
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.SM,
    height: 40,
    minWidth: 100,
  },
});

export default styles;
