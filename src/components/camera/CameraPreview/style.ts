import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT, MARGIN } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  photo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    marginTop: MARGIN.LG,
  },
  button: {
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: MARGIN.LG,
    marginBottom: MARGIN.MD,
  },
});

export default styles;
