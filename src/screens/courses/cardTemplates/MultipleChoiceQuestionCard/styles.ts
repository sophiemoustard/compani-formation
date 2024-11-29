import { StyleSheet } from 'react-native';
import { GREY } from '../../../../styles/colors';
import { MARGIN, PADDING } from '../../../../styles/metrics';

const styles = (backgroundColor: string) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  propositionsContainer: {
    marginHorizontal: MARGIN.LG,
    paddingBottom: PADDING.XL,
  },
  footerContainer: {
    backgroundColor,
  },
});

export default styles;
