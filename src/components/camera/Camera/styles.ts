import { StyleSheet } from 'react-native';
import { WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, ICON, MARGIN } from '../../../styles/metrics';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttons: {
    marginHorizontal: MARGIN.XXL,
    marginVertical: MARGIN.XL,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  flash: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ICON.XL,
  },
  cameraType: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: MARGIN.XS,
    width: ICON.XL,
  },
  takePicture: {
    width: ICON.XXXL,
    height: ICON.XXXL,
    borderRadius: BORDER_RADIUS.XXL,
    borderColor: WHITE,
    borderWidth: 4 * BORDER_WIDTH,
  },
});

export default styles;
