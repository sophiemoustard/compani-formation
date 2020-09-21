import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR, FIRA_SANS_BLACK } from './fonts';
import { BORDER_RADIUS, MARGIN } from './metrics';

export default StyleSheet.create({
  title: {
    ...FIRA_SANS_BLACK.XL,
    marginBottom: MARGIN.MD,
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
    marginBottom: MARGIN.MD,
  },
  media: {
    resizeMode: 'cover',
    borderRadius: BORDER_RADIUS.MD,
  },
});
