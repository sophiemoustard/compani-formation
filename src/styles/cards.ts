import { StyleSheet } from 'react-native';
import { GREY } from './colors';
import { FIRA_SANS_REGULAR, FIRA_SANS_BLACK, FIRA_SANS_MEDIUM } from './fonts';
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
  question: {
    ...FIRA_SANS_MEDIUM.LG,
    color: GREY['800'],
    marginBottom: MARGIN.XL,
  },
  explanation: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'justify',
    marginHorizontal: MARGIN.LG,
    marginTop: MARGIN.MD,
    marginBottom: -MARGIN.SM,
  },
});
