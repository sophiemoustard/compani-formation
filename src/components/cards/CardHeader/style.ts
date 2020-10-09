import { StyleSheet } from 'react-native';
import { ICON, MARGIN } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    marginBottom: MARGIN.XL,
    marginTop: MARGIN.MD,
    marginLeft: MARGIN.MD,
  },
  closeButton: {
    width: ICON.LG,
    justifyContent: 'center',
    alignItems: 'center',
    left: -1,
  },
});

export default styles;
