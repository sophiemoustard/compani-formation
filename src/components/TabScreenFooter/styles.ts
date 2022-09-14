import { StyleSheet } from 'react-native';
import { MARGIN, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../styles/metrics';

const ELIPSE_WIDTH = 720;

const styles = StyleSheet.create({
  footer: {
    height: 140 + SCREEN_HEIGHT / 7,
    alignItems: 'center',
    marginTop: 'auto',
  },
  elipse: {
    width: '100%',
    position: 'absolute',
    top: SCREEN_HEIGHT / 7,
    resizeMode: SCREEN_WIDTH < ELIPSE_WIDTH ? 'contain' : 'stretch',
  },
  drawing: {
    position: 'absolute',
    height: 100 + SCREEN_HEIGHT / 9,
    resizeMode: 'contain',
    marginVertical: MARGIN.XL,
  },
});

export default styles;
