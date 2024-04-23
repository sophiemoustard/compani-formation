import { StyleSheet } from 'react-native';
import { GREEN, GREY } from '../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, ICON } from '../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    width: ICON.XL,
    alignSelf: 'center',
    alignItems: 'center',
  },
  unstartedContainer: {
    width: ICON.MD,
    alignItems: 'center',
  },
  progressContainer: {
    width: ICON.MD,
    height: ICON.MD,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishedContainer: {
    width: ICON.XL,
    height: ICON.XL,
    backgroundColor: GREEN[600],
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 4 * BORDER_WIDTH,
    borderColor: GREEN[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
