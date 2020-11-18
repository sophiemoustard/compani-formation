import { StyleSheet } from 'react-native';
import { GREY, PINK } from './colors';
import { FIRA_SANS_REGULAR, FIRA_SANS_BLACK, FIRA_SANS_MEDIUM } from './fonts';
import { BORDER_RADIUS, MARGIN, PADDING } from './metrics';

export default StyleSheet.create({
  title: {
    ...FIRA_SANS_BLACK.XL,
    marginBottom: MARGIN.MD,
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
    marginBottom: MARGIN.XL,
  },
  media: {
    resizeMode: 'contain',
    borderRadius: BORDER_RADIUS.MD,
  },
  question: {
    ...FIRA_SANS_MEDIUM.LG,
    color: GREY[800],
    marginBottom: MARGIN.XL,
  },
  explanation: {
    ...FIRA_SANS_REGULAR.MD,
    paddingHorizontal: PADDING.XL,
    paddingVertical: PADDING.LG,
  },
  informativeText: {
    ...FIRA_SANS_REGULAR.SM,
    color: PINK[500],
    marginBottom: MARGIN.SM,
  },
});
