import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    marginHorizontal: MARGIN.LG,
  },
  goBack: {
    margin: MARGIN.MD,
  },
  footer: {
    marginBottom: MARGIN.XL,
    justifyContent: 'flex-end',
    flex: 1,
  },
  errorMessage: {
    marginVertical: MARGIN.SM,
  },
});

export default styles;
