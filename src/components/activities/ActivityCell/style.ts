import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR, NUNITO_BOLD } from '../../../styles/fonts';
import { BORDER_RADIUS, PADDING } from '../../../styles/metrics';
import { WHITE } from '../../../styles/colors';

export default checkBackgroundColor => StyleSheet.create({
  container: {
    display: 'flex',
    width: 128,
    alignItems: 'center',
  },
  activityName: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: -12,
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.MD,
    paddingHorizontal: PADDING.XS,
  },
  scoreContainer: {
    position: 'absolute',
    bottom: 0,
    left: '70%',
    backgroundColor: checkBackgroundColor,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 2,
    borderColor: WHITE,
  },
  score: {
    ...NUNITO_BOLD.SM,
    color: WHITE,
    paddingHorizontal: PADDING.SM,
  },
});
