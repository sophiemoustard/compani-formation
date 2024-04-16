import { StyleSheet } from 'react-native';
import { GREY } from '@/styles/colors';
import { MARGIN } from '@/styles/metrics';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  goBack: {
    marginTop: MARGIN.MD,
    marginLeft: MARGIN.MD,
  },
});
