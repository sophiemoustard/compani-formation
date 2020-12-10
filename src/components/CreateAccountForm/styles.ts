import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';

const styles = StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginVertical: MARGIN.LG,
  },
  keyboardAvoidingView: {
    flexGrow: 1,
  },
  input: {
    marginBottom: MARGIN.SM,
  },
  container: {
    flexGrow: 1,
    marginHorizontal: MARGIN.LG,
  },
  footer: {
    marginBottom: MARGIN.XL + MARGIN.MD,
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default styles;
