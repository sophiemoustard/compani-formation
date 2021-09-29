import { StyleSheet } from 'react-native';
import { WHITE, GREY } from '../../styles/colors';
import { BORDER_WIDTH, MARGIN, PADDING, SCREEN_WIDTH } from '../../styles/metrics';
import { FIRA_SANS_REGULAR, FIRA_SANS_BOLD } from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    paddingVertical: PADDING.LG,
    paddingHorizontal: PADDING.XL,
    alignItems: 'center',
    borderBottomWidth: 2 * BORDER_WIDTH,
    borderColor: GREY[200],
  },
  title: {
    ...FIRA_SANS_BOLD.MD,
    color: GREY[800],
    maxWidth: (2 * SCREEN_WIDTH) / 3,
  },
  progressBarContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  progressPercentage: {
    ...FIRA_SANS_REGULAR.SM,
    color: GREY[600],
    marginVertical: MARGIN.XS,
  },
  progressBar: {
    width: 64,
  },
});

export default styles;
