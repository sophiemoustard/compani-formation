import { StyleSheet } from 'react-native';
import { MAIN_MARGIN_LEFT, PADDING, BORDER_WIDTH, BORDER_RADIUS } from '@/styles/metrics';
import { TRANSPARENT_GREY, WHITE } from '@/styles/colors';
import { FIRA_SANS_BOLD } from '@/styles/fonts';

const styles = StyleSheet.create({
  emptyStateContainer: {
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: BORDER_WIDTH,
    borderColor: TRANSPARENT_GREY,
    overflow: 'hidden',
    backgroundColor: WHITE,
    marginHorizontal: MAIN_MARGIN_LEFT,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 176,
    padding: PADDING.LG,
  },
  emptyStateLearnerImage: {
    position: 'absolute',
    right: -160,
    bottom: 8,
    height: 144,
  },
  emptyStateTrainerImage: {
    position: 'absolute',
    right: -180,
    bottom: 0,
    height: 108,
  },
  emptyStateText: {
    ...FIRA_SANS_BOLD.MD,
    textAlign: 'center',
  },
});

export default styles;
