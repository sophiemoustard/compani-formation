import { StyleSheet } from 'react-native';
import { PADDING } from '../../../styles/metrics';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../../styles/fonts';

const styles = (textColor: string, backgroundColor: string) => StyleSheet.create({
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
});

export default styles;
