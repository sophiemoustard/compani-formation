import { StyleSheet } from 'react-native';
import { WHITE, GREY } from '../../styles/colors';
import { BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_REGULAR, FIRA_SANS_MEDIUM } from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    paddingVertical: PADDING.MD,
    paddingHorizontal: PADDING.LG,
    alignItems: 'center',
    borderBottomWidth: 2 * BORDER_WIDTH,
    borderColor: GREY[200],
  },
  title: {
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[800],
  },
  progressBarContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  stepRatio: {
    ...FIRA_SANS_REGULAR.SM,
    color: GREY[600],
    marginHorizontal: MARGIN.MD,
    marginVertical: MARGIN.XS,
  },
  progressBar: {
    width: 120,
  },
});

export default styles;
