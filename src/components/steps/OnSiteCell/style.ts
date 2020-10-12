import { StyleSheet } from 'react-native';
import { GREY } from '../../../styles/colors';
import { PADDING, BORDER_WIDTH } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: GREY[100],
    flexDirection: 'row',
    padding: PADDING.LG,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
  },
  infoButtonContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default styles;
