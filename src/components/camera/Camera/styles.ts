import { StyleSheet } from 'react-native';
import { WHITE } from '../../../styles/colors';
import { BORDER_WIDTH, MARGIN, PADDING } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  text: {
    fontSize: 20,
  },
  flash: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
  },
  cameraType: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PADDING.SM,
    width: 32,
  },
  takePicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: WHITE,
    borderWidth: 4 * BORDER_WIDTH,
  },
});

export default styles;
