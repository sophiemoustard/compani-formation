import { StyleSheet } from 'react-native';
import { GREY } from '@/styles/colors';
import { PADDING } from '@/styles/metrics';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  header: {
    paddingTop: PADDING.LG,
    paddingHorizontal: PADDING.LG,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;
