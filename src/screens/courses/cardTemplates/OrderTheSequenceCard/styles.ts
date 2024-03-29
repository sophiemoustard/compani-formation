import { StyleSheet } from 'react-native';
import { GREY } from '../../../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../../../styles/fonts';
import { MARGIN } from '../../../../styles/metrics';

const styles = (backgroundColor: string) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  container: {
    marginHorizontal: MARGIN.LG,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: MARGIN.SM,
  },
  questionContainer: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  question: {
    ...FIRA_SANS_REGULAR.MD,
    marginHorizontal: MARGIN.LG,
  },
  footerContainer: {
    backgroundColor,
  },
});

export default styles;
