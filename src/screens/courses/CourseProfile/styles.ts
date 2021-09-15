import { StyleSheet } from 'react-native';
import { WHITE, GREY } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MAIN_MARGIN_LEFT, MARGIN, PADDING } from '../../../styles/metrics';
import { FIRA_SANS_BLACK, NUNITO_SEMI, FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../../styles/fonts';

const imageHeight = 200;
const styles = StyleSheet.create({
  image: {
    height: imageHeight,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: imageHeight * 0.4,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    height: imageHeight,
    position: 'absolute',
  },
  arrow: {
    margin: MAIN_MARGIN_LEFT,
  },
  arrowShadow: {
    textShadowColor: GREY[800],
    textShadowRadius: 4,
    textShadowOffset: { width: 1, height: 1 },
  },
  title: {
    ...FIRA_SANS_BLACK.XL,
    color: WHITE,
    margin: MAIN_MARGIN_LEFT,
    textShadowColor: GREY[800],
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 1 },
  },
  separator: {
    marginBottom: MARGIN.MD,
  },
  flatList: {
    marginVertical: MARGIN.MD,
  },
  progressBarContainer: {
    marginBottom: MARGIN.MD,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: MARGIN.XL,
  },
  progressBarHeaderContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: PADDING.LG,
  },
  stickyProgressBar: {
    width: 120,
  },
  stickyProgressBarText: {
    ...FIRA_SANS_REGULAR.SM,
    color: GREY[600],
    marginHorizontal: MARGIN.MD,
    marginVertical: MARGIN.XS,
  },
  stickyHeader: {
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: WHITE,
    paddingVertical: PADDING.LG,
    paddingLeft: PADDING.LG,
    alignItems: 'center',
    borderBottomWidth: 2 * BORDER_WIDTH,
    borderColor: GREY[200],
  },
  headerTitle: {
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[800],
  },
  progressBarText: {
    ...NUNITO_SEMI.XS,
    color: GREY[600],
  },
  aboutContainer: {
    marginVertical: MARGIN.LG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutContent: {
    borderColor: GREY[200],
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.SM,
    paddingVertical: PADDING.MD,
    paddingHorizontal: PADDING.LG,
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutText: {
    ...FIRA_SANS_MEDIUM.LG,
    color: GREY[600],
    paddingLeft: PADDING.MD,
  },
});

export default styles;
