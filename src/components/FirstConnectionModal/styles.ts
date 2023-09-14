import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  button: {
    marginBottom: MARGIN.MD,
  },
  goBack: {
    alignSelf: 'flex-end',
  },
  modalContent: {
    marginVertical: MARGIN.LG,
    justifyContent: 'space-evenly',
  },
});

export default styles;
