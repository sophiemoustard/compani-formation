import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../styles/metrics';
import { GREY } from '../../styles/colors';

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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: MARGIN.MD,
  },
});

export default styles;
