import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR, FIRA_SANS_BLACK } from './fonts';
import { MARGIN } from './metrics';

export default StyleSheet.create({
  title: {
    ...FIRA_SANS_BLACK.XL,
    marginBottom: MARGIN.MD,
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
    marginBottom: MARGIN.MD,
  },
});
