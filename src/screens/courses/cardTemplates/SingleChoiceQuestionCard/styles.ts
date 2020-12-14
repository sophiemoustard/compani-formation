import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../../../styles/metrics';
import { GREY } from '../../../../styles/colors';

const styles = (isPressed: boolean, backgroundColor: string) => StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: PADDING.XL,
  },
  footerContainer: {
    backgroundColor: isPressed ? backgroundColor : GREY[100],
  },
});

export default styles;
