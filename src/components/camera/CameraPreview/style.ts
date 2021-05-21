import { StyleSheet } from 'react-native';
import { MARGIN } from '../../../styles/metrics';

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
    marginHorizontal: MARGIN.LG,
    marginBottom: MARGIN.MD,
  },
});

export default styles;
