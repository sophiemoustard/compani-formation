import { StyleSheet } from 'react-native';
import { GREY } from '../../../styles/colors';
import { PADDING, BORDER_WIDTH } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: GREY[100],
    flexDirection: 'row',
    padding: PADDING.LG,
    borderColor: GREY[200],
    borderBottomWidth: BORDER_WIDTH,
  },
  upperContainer: {
    borderTopWidth: BORDER_WIDTH,
  },
  iconContainer: {
    justifyContent: 'space-between',
  },
  openedContainer: {
    marginRight: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  infoButtonContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  iconButtonContainer: {
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
});

export default styles;
