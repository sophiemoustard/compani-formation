import { StyleSheet } from 'react-native';
import { WHITE } from '../../styles/colors';
import { MARGIN } from '../../styles/metrics';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
  },
  goBack: {
    marginTop: MARGIN.MD,
    marginLeft: MARGIN.MD,
  },
});
