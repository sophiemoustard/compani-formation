import { StyleSheet } from 'react-native';
import { ICON, MARGIN } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    marginBottom: MARGIN.XL,
    marginTop: MARGIN.MD,
    marginHorizontal: MARGIN.MD,
    alignItems: 'center',
    flexDirection: 'row',
  },
  closeButton: {
    width: ICON.LG,
    justifyContent: 'center',
    alignItems: 'center',
    left: -1,
  },
});

export default styles;
