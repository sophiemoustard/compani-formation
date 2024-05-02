import { StyleSheet } from 'react-native';
import { GREY } from '@/styles/colors';
import { MARGIN } from '@/styles/metrics';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  container: {
    marginHorizontal: MARGIN.MD,
  },
});

export default styles;
