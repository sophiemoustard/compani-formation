import { StyleSheet } from 'react-native';
import { MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../../styles/fonts';

const styles = StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
  },
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
  input: {
    marginBottom: MARGIN.MD,
  },
  validate: {
    marginVertical: MARGIN.MD,
  },
});

export default styles;
