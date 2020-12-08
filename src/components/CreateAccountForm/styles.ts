import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';

const styles = StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
    margin: MARGIN.LG,
  },
  input: {
    marginBottom: MARGIN.SM,
  },
  container: {
    flexGrow: 1,
    marginHorizontal: MARGIN.LG,
  },
  footer: {
    marginBottom: MARGIN.XL,
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default styles;
