import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR } from '../../../../styles/fonts';
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
  footerContainer: {
    backgroundColor,
  },
});

export default styles;
