import { StyleSheet } from 'react-native';
import { GREY } from '../../../styles/colors';
import { PADDING, ICON } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY[200],
    paddingVertical: PADDING.MD,
    paddingHorizontal: PADDING.LG,
  },
  icon: {
    width: ICON.MD,
    alignSelf: 'center',
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timer: {
    paddingHorizontal: PADDING.SM,
  },
  track: {
    flex: 1,
  },
});

export default styles;
