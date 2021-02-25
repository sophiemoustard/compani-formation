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
    justifyContent: 'flex-end',
    marginBottom: MARGIN.MD,
    flex: 1,
  },
  modalWrapper: {
    height: 50,
  },
  modalText: {
    ...FIRA_SANS_ITALIC.SM,
    color: GREY[600],
    marginBottom: MARGIN.MD,
  },
  modalLink: {
    textDecorationLine: 'underline',
  },
});

export default styles;
