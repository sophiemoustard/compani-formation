import { StyleSheet } from 'react-native';
import { GREY, PINK } from '../../../styles/colors';
import { PADDING, ICON, SCREEN_HEIGHT } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY[200],
    paddingVertical: PADDING.MD,
    paddingHorizontal: PADDING.LG,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: ICON.MD,
    alignSelf: 'center',
  },
  timer: {
    paddingHorizontal: PADDING.SM,
  },
  track: {
    flex: 1,
  },
  webContainer: {
    width: 'auto',
    height: SCREEN_HEIGHT / 3,
    backgroundColor: PINK[100],
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webBackgroundIcon: {
    position: 'absolute',
    opacity: 0.2,
  },
});

export default styles;
