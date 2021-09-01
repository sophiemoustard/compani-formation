import { StyleSheet } from 'react-native';
import { MARGIN } from './metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR, FIRA_SANS_ITALIC, FIRA_SANS_MEDIUM } from './fonts';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: MARGIN.MD,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
  },
  italicText: {
    ...FIRA_SANS_ITALIC.MD,
    textAlign: 'left',
    marginBottom: MARGIN.MD,
  },
  articleTitle: {
    ...FIRA_SANS_MEDIUM.MD,
    textAlign: 'left',
    marginBottom: MARGIN.SM,
  },
  sectionTitle: {
    ...FIRA_SANS_BOLD.MD,
    textAlign: 'left',
    marginBottom: MARGIN.SM,
  },
  contentText: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'left',
    marginBottom: MARGIN.MD,
  },
  lastContentText: {
    marginBottom: MARGIN.LG,
  },
});
