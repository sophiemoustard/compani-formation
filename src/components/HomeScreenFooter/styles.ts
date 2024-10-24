import { StyleSheet } from 'react-native';
import { MARGIN, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../styles/metrics';

const ELLIPSE_WIDTH = 720;
const ELLIPSE_HEIGHT = 295;

const styles = StyleSheet.create({
  footer: {
    height: ELLIPSE_HEIGHT / 2 + SCREEN_HEIGHT / 7,
    alignItems: 'center',
    marginTop: 'auto',
    overflow: 'hidden',
  },
  ellipse: {
    width: '100%',
    position: 'absolute',
    top: SCREEN_HEIGHT / 8,
    resizeMode: SCREEN_WIDTH < ELLIPSE_WIDTH ? 'contain' : 'stretch',
  },
  drawing: {
    position: 'absolute',
    height: ELLIPSE_HEIGHT / 3 + SCREEN_HEIGHT / 9,
    resizeMode: 'contain',
    marginVertical: MARGIN.XL,
  },
});

export default styles;
