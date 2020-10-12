import { StyleSheet } from 'react-native';
import { WHITE, TRANSPARENT_GREY } from '../../styles/colors';
import { BORDER_RADIUS, PADDING, PROGRAM_CELL_WIDTH, BORDER_WIDTH } from '../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';

const imageHeight = 100;
const styles = StyleSheet.create({
  courseContainer: {
    borderRadius: BORDER_RADIUS.SM,
    width: PROGRAM_CELL_WIDTH,
    borderWidth: BORDER_WIDTH,
    borderColor: TRANSPARENT_GREY,
    overflow: 'hidden',
  },
  image: {
    height: imageHeight,
  },
  imageContainer: {
    height: imageHeight,
  },
  title: {
    ...FIRA_SANS_MEDIUM.MD,
    padding: PADDING.MD,
    backgroundColor: WHITE,
    borderBottomLeftRadius: BORDER_RADIUS.SM,
    borderBottomRightRadius: BORDER_RADIUS.SM,
  },
});

export default styles;
