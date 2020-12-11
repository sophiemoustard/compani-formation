import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR, FIRA_SANS_MEDIUM } from '../../../../styles/fonts';
import { MARGIN, PADDING } from '../../../../styles/metrics';

const styles = (textColor: string, backgroundColor: string) => StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
  },
  draggableContainer: {
    flexGrow: 1,
    paddingBottom: PADDING.XL,
  },
  questionContainer: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  question: {
    ...FIRA_SANS_REGULAR.MD,
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
