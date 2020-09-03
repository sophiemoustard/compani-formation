import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, MARGIN, PADDING, MAIN_MARGIN_LEFT } from './metrics';
import { WHITE } from './colors';
import { FIRA_SANS_BLACK, FIRA_SANS_BOLD } from './fonts';

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
    ...FIRA_SANS_BOLD.LG,
    marginLeft: MAIN_MARGIN_LEFT,
  },
  countContainer: {
    marginBottom: MARGIN.SM,
    paddingVertical: PADDING.XS,
    paddingHorizontal: PADDING.SM,
    marginLeft: MARGIN.SM,
    borderRadius: BORDER_RADIUS.XS,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: MARGIN.MD,
  },
  cardText: {
    fontSize: 16,
    marginBottom: MARGIN.SM,
  },
});
