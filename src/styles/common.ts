import { StyleSheet } from 'react-native';
import { MARGIN, MAIN_MARGIN_LEFT } from './metrics';
import { WHITE } from './colors';
import { FIRA_SANS_BLACK } from './fonts';

const commonStyles = StyleSheet.create({
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
  listItems: {
    margin: MARGIN.XS,
  },
});

export default commonStyles;

export const markdownStyle = bodyStyle => ({
  body: bodyStyle,
  list_item: commonStyles.listItems,
});
