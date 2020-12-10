import { StyleSheet } from 'react-native';
import { MARGIN, BORDER_WIDTH, BORDER_RADIUS, ICON, PADDING, BUTTON_HEIGHT } from '../../../styles/metrics';
import { WHITE, GREY, GREEN, ORANGE } from '../../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';

const styles = (color: string, isSelected: boolean, isGoodAnswer: boolean, isValidated: boolean) => StyleSheet.create({
  answerContainer: {
    marginBottom: MARGIN.SM,
  },
  answer: {
    flexDirection: 'row',
    minHeight: BUTTON_HEIGHT,
    borderWidth: BORDER_WIDTH,
    backgroundColor: !isValidated || isSelected || isGoodAnswer ? WHITE : GREY[100],
    borderColor: isSelected ? color : GREY[200],
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
  },
  markerContainer: {
    marginHorizontal: MARGIN.SM,
    position: 'absolute',
    right: 0,
    height: '100%',
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: WHITE,
    justifyContent: 'center',
  },
  marker: {
    color: isGoodAnswer ? GREEN[600] : ORANGE[600],
    fontSize: ICON.MD,
    alignSelf: 'center',
    padding: PADDING.MD,
    backgroundColor: !isValidated || isSelected || isGoodAnswer ? WHITE : GREY[100],
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    ...FIRA_SANS_MEDIUM.MD,
    color: !isValidated || (!isSelected && isGoodAnswer) ? GREY[800] : color,
    marginVertical: MARGIN.LG / 2,
    marginHorizontal: MARGIN.MD,
  },
  shadow: {
    backgroundColor: isSelected ? color : GREY[200],
    borderRadius: BORDER_RADIUS.LG,
  },
});

export default styles;
