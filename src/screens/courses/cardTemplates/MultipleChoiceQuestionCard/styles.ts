import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../../../styles/metrics';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../../../styles/fonts';

const styles = (textColor: string, backgroundColor: string) => StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: PADDING.XL,
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
