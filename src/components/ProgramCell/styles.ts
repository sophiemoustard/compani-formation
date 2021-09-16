import { StyleSheet } from 'react-native';
import { WHITE, TRANSPARENT_GREY, GREY, GREEN } from '../../styles/colors';
import { BORDER_RADIUS, PADDING, SCREEN_WIDTH, BORDER_WIDTH, ICON, MARGIN } from '../../styles/metrics';
import { FIRA_SANS_REGULAR, FIRA_SANS_BOLD } from '../../styles/fonts';

const imageHeight = 128;
const containerHeight = 288;
const styles = StyleSheet.create({
  courseContainer: {
    borderRadius: BORDER_RADIUS.SM,
    width: SCREEN_WIDTH - 2 * MARGIN.MD,
    borderWidth: BORDER_WIDTH,
    borderColor: TRANSPARENT_GREY,
    overflow: 'hidden',
    backgroundColor: WHITE,
    height: containerHeight,
  },
  image: {
    height: imageHeight,
  },
  imageContainer: {
    height: imageHeight,
  },
  title: {
    ...FIRA_SANS_BOLD.MD,
    padding: PADDING.MD,
    backgroundColor: WHITE,
    borderBottomLeftRadius: BORDER_RADIUS.SM,
    borderBottomRightRadius: BORDER_RADIUS.SM,
  },
  description: {
    ...FIRA_SANS_REGULAR.MD,
    padding: PADDING.MD,
  },
  progressContainer: {
    margin: MARGIN.SM,
    width: ICON.MD,
    height: ICON.MD,
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    width: ICON.XS,
    height: ICON.XS,
  },
  finishedContainer: {
    margin: MARGIN.SM,
    width: ICON.XL,
    height: ICON.XL,
    backgroundColor: GREEN[600],
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 4 * BORDER_WIDTH,
    borderColor: GREEN[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  unstartedContainer: {
    margin: MARGIN.SM,
    width: ICON.MD,
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.LG,
  },
});

export default styles;
