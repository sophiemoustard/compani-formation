import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR, FIRA_SANS_MEDIUM } from '../../styles/fonts';

const styles = StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginVertical: MARGIN.LG,
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
    marginBottom: MARGIN.SM,
  },
  footer: {
    marginBottom: MARGIN.XL,
    justifyContent: 'flex-end',
    flex: 1,
  },
  contentText: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'center',
    marginBottom: MARGIN.XL,
    width: '100%',
  },
  email: {
    ...FIRA_SANS_MEDIUM.MD,
  },
  errorMessage: {
    marginVertical: MARGIN.SM,
  },
});

export default styles;
