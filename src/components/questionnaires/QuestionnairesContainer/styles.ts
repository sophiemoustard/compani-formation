import { StyleSheet } from 'react-native';
import { YELLOW } from '../../../styles/colors';
import { FIRA_SANS_ITALIC, FIRA_SANS_BOLD_ITALIC } from '../../../styles/fonts';
import { MARGIN, PADDING } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: YELLOW[100],
    marginBottom: MARGIN.LG,
  },
  header: {
    backgroundColor: YELLOW[300],
    flexDirection: 'row',
  },
  headerText: {
    ...FIRA_SANS_ITALIC.SM,
    paddingHorizontal: PADDING.LG,
    paddingVertical: PADDING.MD,
  },
  questionnairesCount: {
    ...FIRA_SANS_BOLD_ITALIC.SM,
  },
});

export default styles;
