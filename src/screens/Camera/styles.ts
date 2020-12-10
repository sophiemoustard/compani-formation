import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBack: {
    position: 'absolute',
    left: 0,
    top: 0,
    margin: MARGIN.MD,
  },
});

export default styles;
