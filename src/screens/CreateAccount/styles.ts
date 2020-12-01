import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  goBack: {
    marginBottom: MARGIN.XL,
    marginTop: MARGIN.MD,
    marginHorizontal: MARGIN.MD,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;
