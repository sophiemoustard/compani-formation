import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_ITALIC } from '../../styles/fonts';
import { GREY } from '../../styles/colors';

const styles = StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginVertical: MARGIN.LG,
  },
  keyboardAvoidingView: {
    flexGrow: 1,
  },
  input: {
    marginBottom: MARGIN.XS,
  },
  container: {
    flexGrow: 1,
    marginHorizontal: MARGIN.LG,
  },
  footer: {
    marginBottom: MARGIN.XL + MARGIN.SM,
    justifyContent: 'flex-end',
    flex: 1,
  },
  modalText: {
    ...FIRA_SANS_ITALIC.SM,
    color: GREY[600],
  },
  modalLink: {
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default styles;
