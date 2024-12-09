import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { GREY } from '../../styles/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  container: {
    flexGrow: 1,
    marginHorizontal: MARGIN.LG,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginVertical: MARGIN.LG,
  },
  button: {
    marginHorizontal: MARGIN.MD,
    marginBottom: MARGIN.MD,
  },
});

export default styles;
