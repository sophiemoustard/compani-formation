import { StyleSheet } from 'react-native';
import { MARGIN } from './metrics';
import { FIRA_SANS_BOLD } from './fonts';

const styles = StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginVertical: MARGIN.LG,
  },
  screenView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    marginHorizontal: MARGIN.LG,
  },
  input: {
    marginBottom: MARGIN.XS,
  },
  footer: {
    marginBottom: MARGIN.LG,
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default styles;
