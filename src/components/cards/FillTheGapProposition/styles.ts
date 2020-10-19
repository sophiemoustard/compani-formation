import { StyleSheet } from 'react-native';
import { GREY, WHITE } from '../../../styles/colors';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  PADDING,
} from '../../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';

interface ComponentProps {
  color: string,
  isGoodAnswer: boolean,
  isSelected: boolean,
  isValidated: boolean,
  isGap: boolean
}

const styles = ({ color, isGoodAnswer, isSelected, isValidated, isGap }: ComponentProps) => StyleSheet.create({
  shadow: {
    backgroundColor: (isValidated && isGap) && (isSelected || isGoodAnswer) ? color : GREY[200],
    borderRadius: BORDER_RADIUS.MD,
  },
  textContainer: {
    backgroundColor: WHITE,
    borderWidth: BORDER_WIDTH,
    borderColor: isValidated && (isSelected || isGoodAnswer) ? color : GREY[200],
    borderRadius: BORDER_RADIUS.MD,
    flex: 1,
  },
  text: {
    ...FIRA_SANS_MEDIUM.MD,
    padding: PADDING.MD,
    textAlign: 'center',
    color: isValidated && (isSelected || isGoodAnswer) ? color : GREY[800],
  },
});

export default styles;
