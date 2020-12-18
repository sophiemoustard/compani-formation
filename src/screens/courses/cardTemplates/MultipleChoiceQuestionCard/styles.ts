import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../../../styles/metrics';

const styles = (backgroundColor: string) => StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: PADDING.XL,
  },
  footerContainer: {
    backgroundColor,
  },
});

export default styles;
