import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { WHITE, GREY } from '../../styles/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginVertical: MARGIN.LG,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: GREY[100],
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
});

export default styles;
