import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';

const styles = StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginVertical: MARGIN.LG,
  },

  input: {
    marginBottom: MARGIN.SM,
  },
});

export default styles;
