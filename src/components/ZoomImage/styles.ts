import { StyleSheet } from 'react-native';
import { MODAL_BACKDROP_GREY } from '../../styles/colors';
import { PADDING, SCREEN_HEIGHT } from '../../styles/metrics';

const styles = StyleSheet.create({
  goBack: {
    alignSelf: 'flex-end',
    paddingRight: PADDING.LG,
    paddingTop: PADDING.LG,
  },
  media: {
    height: SCREEN_HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: MODAL_BACKDROP_GREY,
    width: '100%',
    position: 'absolute',
    zIndex: 100,
  },
});

export default styles;
