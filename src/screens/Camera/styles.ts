import { StyleSheet } from 'react-native';
import { BLACK } from '../../styles/colors';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BLACK,
  },
  goBack: {
    position: 'absolute',
    alignItems: 'flex-start',
    margin: MARGIN.MD,
  },
});

export default styles;
