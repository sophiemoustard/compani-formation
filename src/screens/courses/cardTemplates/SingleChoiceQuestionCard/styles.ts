import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../../../styles/metrics';
import { GREY } from '../../../../styles/colors';

const styles = (isPressed: boolean, backgroundColor: string) => StyleSheet.create({
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
    backgroundColor: isPressed ? backgroundColor : GREY[100],
  },
});

export default styles;
