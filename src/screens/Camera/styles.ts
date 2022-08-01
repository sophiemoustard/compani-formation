import { StyleSheet } from 'react-native';
import { WHITE } from '../../styles/colors';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  goBack: {
    position: 'absolute',
    alignItems: 'flex-start',
    margin: MARGIN.MD,
  },
});

export default styles;
