import { StyleSheet } from 'react-native';
import { GREY } from '../../styles/colors';
import { PADDING } from '../../styles/metrics';

const styles = StyleSheet.create({
  header: {
    paddingTop: PADDING.LG,
    paddingHorizontal: PADDING.LG,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: GREY[100],
  },
});

export default styles;
