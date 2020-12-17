import { StyleSheet } from 'react-native';
import { GREY, WHITE } from '../../../styles/colors';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  GAP_WIDTH,
  PADDING,
} from '../../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';

interface StylesProps {
  color: string,
  isGoodAnswer: boolean,
  isSelected: boolean,
  isValidated: boolean
}

const styles = ({ color, isGoodAnswer, isSelected, isValidated }: StylesProps) => StyleSheet.create({
  shadow: {
    backgroundColor: isValidated && (isSelected || isGoodAnswer) ? color : GREY[200],
    borderRadius: BORDER_RADIUS.MD,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
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
    width: GAP_WIDTH,
    color: isValidated && (isSelected || isGoodAnswer) ? color : GREY[800],
  },
});

export default styles;
