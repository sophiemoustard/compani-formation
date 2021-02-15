import { StyleSheet } from 'react-native';
import { MODAL_BACKDROP_GREY } from '../../styles/colors';
import { PADDING, SCREEN_HEIGHT } from '../../styles/metrics';

const styles = StyleSheet.create({
  goBack: {
    alignSelf: 'flex-end',
    paddingRight: PADDING.LG,
    paddingTop: PADDING.LG,
    position: 'absolute',
  },
  media: {
    height: SCREEN_HEIGHT,
  },
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexGrow: 1,
    backgroundColor: MODAL_BACKDROP_GREY,
    zIndex: 100,
  },
  content: {
    justifyContent: 'center',
  },
});

export default styles;
