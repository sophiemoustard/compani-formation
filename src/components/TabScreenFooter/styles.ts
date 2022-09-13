import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  elipse: {
    width: '100%',
    position: 'absolute',
    top: 64,
    resizeMode: 'contain',
  },
  drawing: {
    width: 152,
    height: 168,
    marginVertical: MARGIN.XL,
  },
});

export default styles;
