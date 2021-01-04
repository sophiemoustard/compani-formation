import { StyleSheet } from 'react-native';
import { PINK } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...FIRA_SANS_MEDIUM.MD,
    color: PINK[500],
    marginBottom: MARGIN.SM,
  },
});

export default styles;
