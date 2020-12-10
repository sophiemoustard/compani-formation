import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR, FIRA_SANS_MEDIUM } from '../../styles/fonts';

const styles = isKeyboardOpen => StyleSheet.create({
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
    marginTop: MARGIN.MD,
    marginLeft: MARGIN.MD,
  },
  input: {
    marginBottom: MARGIN.XS,
  },
  footer: {
    marginTop: MARGIN.LG,
    marginBottom: isKeyboardOpen ? MARGIN.MD : MARGIN.XL,
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
    marginTop: MARGIN.SM,
  },
});

export default styles;
