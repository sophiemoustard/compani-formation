import { StyleSheet } from 'react-native';
import { GREY } from '../../../styles/colors';
import { PADDING, ICON } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY[200],
    paddingVertical: PADDING.MD,
    paddingLeft: PADDING.LG,
  },
  icon: {
    width: ICON.MD,
  },
  track: {
    width: '100%',
  },
});

export default styles;
