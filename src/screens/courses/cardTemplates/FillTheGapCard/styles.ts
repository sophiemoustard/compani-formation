import { StyleSheet } from 'react-native';
import { GREY } from '../../../../styles/colors';
import { BORDER_RADIUS, INPUT_HEIGHT, MARGIN, GAP_WIDTH, PADDING } from '../../../../styles/metrics';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../../../styles/fonts';

const styles = (textColor: string, backgroundColor: string) => StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  gapContainer: {
    backgroundColor: GREY[200],
    borderRadius: BORDER_RADIUS.MD,
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.SM,
    height: INPUT_HEIGHT,
    width: GAP_WIDTH,
  },
  answerContainer: {
    height: INPUT_HEIGHT,
    width: GAP_WIDTH,
  },
  explanation: {
    backgroundColor,
  },
  explanationTitle: {
    ...FIRA_SANS_MEDIUM.MD,
    color: textColor,
    paddingBottom: PADDING.MD,
  },
  explanationText: {
    ...FIRA_SANS_REGULAR.MD,
    color: textColor,
    paddingTop: PADDING.MD,
  },
  footerContainer: {
    backgroundColor,
  },
});

export default styles;
