import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { WHITE } from '../../../styles/colors';
import { BORDER_RADIUS } from '../../../styles/metrics';

const styles = StyleSheet.create({
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
    borderRadius: BORDER_RADIUS.XL,
    paddingHorizontal: 3,
  },
});

export default styles;
