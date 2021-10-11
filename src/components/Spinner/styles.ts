import { StyleSheet } from 'react-native';
import { GREY } from '../../styles/colors';
import { MARGIN, SCREEN_WIDTH, SPINNER_BACKGROUND_HEIGHT } from '../../styles/metrics';

const styles = StyleSheet.create({
  spinner: {
    backgroundColor: GREY[200],
    width: SCREEN_WIDTH - 2 * MARGIN.MD,
    height: SPINNER_BACKGROUND_HEIGHT,
    justifyContent: 'center',
  },
});

export default styles;
