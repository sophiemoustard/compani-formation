import { StyleSheet } from 'react-native';
import { GREY } from '../../../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../../../styles/fonts';
import { MARGIN, PADDING } from '../../../../styles/metrics';

const styles = (backgroundColor: string) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
    justifyContent: 'space-between',
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
