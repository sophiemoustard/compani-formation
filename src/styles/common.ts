import { StyleSheet } from 'react-native';
import { MARGIN, MAIN_MARGIN_LEFT } from './metrics';
import { WHITE } from './colors';
import { FIRA_SANS_BLACK, FIRA_SANS_BOLD, FIRA_SANS_ITALIC } from './fonts';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  disabled: {
    opacity: 0.6,
  },
  title: {
    marginLeft: MAIN_MARGIN_LEFT,
    marginVertical: MARGIN.XL,
    ...FIRA_SANS_BLACK.XL,
  },
  sectionTitle: {
    flexDirection: 'row',
    marginBottom: MARGIN.MD,
  },
  iconButton: {
    zIndex: 100,
  },
});

export const markdownStyle = bodyStyle => ({
  body: bodyStyle,
  strong: { ...FIRA_SANS_BOLD.MD },
  em: { ...FIRA_SANS_ITALIC.MD },
  list_item: { margin: MARGIN.XS },
});
