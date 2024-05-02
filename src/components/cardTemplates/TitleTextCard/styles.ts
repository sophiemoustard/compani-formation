import { StyleSheet } from 'react-native';
import { GREY } from '@/styles/colors';
import { MARGIN } from '@/styles/metrics';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  container: {
    flex: 1,
    marginHorizontal: MARGIN.MD,
    marginBottom: MARGIN.LG,
  },
});

export default styles;
