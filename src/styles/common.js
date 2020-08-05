import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, MARGIN, PADDING, COURSE_CELL_WIDTH, MAIN_MARGIN_LEFT } from './metrics';
import { WHITE, TRANSPARENT_GREY } from './colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: MAIN_MARGIN_LEFT,
    marginVertical: MARGIN.XL,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: MAIN_MARGIN_LEFT,
  },
  courseCellContainer: {
    borderRadius: BORDER_RADIUS.SM,
    marginRight: MARGIN.SM,
    width: COURSE_CELL_WIDTH,
    borderWidth: 1,
    borderColor: TRANSPARENT_GREY,
  },
  countContainer: {
    marginBottom: MARGIN.SM,
    paddingVertical: PADDING.XS,
    paddingHorizontal: PADDING.SM,
    marginLeft: MARGIN.SM,
    borderRadius: BORDER_RADIUS.XS,
  }
});
