import { StyleSheet } from 'react-native';
import { ORANGE } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_ITALIC } from '../../../styles/fonts';

const styles = StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
    margin: MARGIN.LG,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  goBack: {
    margin: MARGIN.MD,
  },
  unvalid: {
    ...FIRA_SANS_ITALIC.SM,
    color: ORANGE[600],
    marginTop: 2,
  },
  input: {
    marginBottom: MARGIN.MD,
    marginHorizontal: MARGIN.LG,
  },
  validate: {
    marginVertical: MARGIN.MD,
    marginHorizontal: MARGIN.LG,
  },
});

export default styles;
