import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../../../styles/metrics';
import { GREY } from '../../../../styles/colors';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../../../styles/fonts';

const styles = (isPressed: boolean, backgroundColor: string, textColor: string) => StyleSheet.create({
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
    backgroundColor: isPressed ? backgroundColor : GREY[100],
  },
});

export default styles;
