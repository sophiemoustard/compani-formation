import { StyleSheet } from 'react-native';
import { BLACK } from '../../../styles/colors';
import { MARGIN, PADDING } from '../../../styles/metrics';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: BLACK,
  },
  goBack: {
    position: 'absolute',
    alignItems: 'flex-start',
    margin: MARGIN.MD,
    paddingTop: PADDING.MD,
  },
});

export default styles;
