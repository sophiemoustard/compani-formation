import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, MARGIN, PADDING, MAIN_MARGIN_LEFT } from './metrics';
import { WHITE } from './colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: MAIN_MARGIN_LEFT,
    marginVertical: MARGIN.XL,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: MAIN_MARGIN_LEFT,
  },
  countContainer: {
    marginBottom: MARGIN.SM,
    paddingVertical: PADDING.XS,
    paddingHorizontal: PADDING.SM,
    marginLeft: MARGIN.SM,
    borderRadius: BORDER_RADIUS.XS,
  }
});
