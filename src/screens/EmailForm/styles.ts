import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';

const styles = footerTooClose => StyleSheet.create({
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
    marginBottom: footerTooClose ? MARGIN.MD : MARGIN.XL,
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default styles;
