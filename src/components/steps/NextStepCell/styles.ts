import { StyleSheet } from 'react-native';
import { PADDING, BORDER_RADIUS, PROGRAM_CELL_WIDTH, BORDER_WIDTH } from '../../../styles/metrics';
import { TRANSPARENT_GREY } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.SM,
    width: PROGRAM_CELL_WIDTH,
    borderWidth: BORDER_WIDTH,
    borderColor: TRANSPARENT_GREY,
    flexDirection: 'row',
    padding: PADDING.MD,
  },
});

export default styles;
