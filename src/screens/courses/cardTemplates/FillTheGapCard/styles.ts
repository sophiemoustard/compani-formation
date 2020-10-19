import { StyleSheet } from 'react-native';
import { GREY, TRANSPARENT_LIGHT_GREY } from '../../../../styles/colors';
import {
  BORDER_RADIUS,
  INPUT_HEIGHT,
  MARGIN,
  GAP_WIDTH,
  PADDING,
  ABSOLUTE_BOTTOM_POSITION,
} from '../../../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../../../styles/fonts';

const styles = (textColor: string, backgroundColor: string) => StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  questionContainer: {
    ...FIRA_SANS_MEDIUM.MD,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: PADDING.XL,
    paddingHorizontal: PADDING.LG,
    marginBottom: MARGIN.MD,
    backgroundColor: TRANSPARENT_LIGHT_GREY,
  },
  question: {
    ...FIRA_SANS_MEDIUM.MD,
    lineHeight: INPUT_HEIGHT,
    color: GREY[800],
  },
  gapContainer: {
    backgroundColor: GREY[200],
    borderRadius: BORDER_RADIUS.MD,
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.SM,
    height: INPUT_HEIGHT,
    width: GAP_WIDTH,
  },
  answersContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  answerContainer: {
    height: INPUT_HEIGHT,
    width: GAP_WIDTH,
  },
  explanation: {
    color: textColor,
    minHeight: INPUT_HEIGHT,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: ABSOLUTE_BOTTOM_POSITION,
    backgroundColor,
  },
  footerContainer: {
    backgroundColor,
  },
});

export default styles;
