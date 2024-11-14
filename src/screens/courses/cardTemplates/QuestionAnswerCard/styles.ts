import { StyleSheet } from 'react-native';
import { GREY } from '../../../../styles/colors';
import { MARGIN, PADDING } from '../../../../styles/metrics';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: PADDING.XL,
  },
  footerContainer: {
    backgroundColor: GREY[100],
  },
});

export default styles;
