import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    marginTop: MARGIN.MD,
    marginHorizontal: MARGIN.MD,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;
