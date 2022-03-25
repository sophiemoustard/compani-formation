import { StyleSheet } from 'react-native';
import { WHITE, GREY, PINK } from '../../../styles/colors';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  BUTTON_HEIGHT,
  MAIN_MARGIN_LEFT,
  MARGIN, PADDING,
} from '../../../styles/metrics';
import { FIRA_SANS_BLACK, NUNITO_SEMI, FIRA_SANS_MEDIUM } from '../../../styles/fonts';

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
  buttonContainer: {
    marginVertical: MARGIN.LG,
    marginHorizontal: MARGIN.XL,
  },
  buttonContent: {
    borderRadius: BORDER_RADIUS.SM,
    paddingVertical: PADDING.MD,
    paddingHorizontal: PADDING.XXL,
    marginHorizontal: MARGIN.MD,
    backgroundColor: PINK[500],
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  certificateContent: {
    flexDirection: 'row',
  },
  certificateText: {
    ...FIRA_SANS_MEDIUM.LG,
    color: WHITE,
    paddingLeft: PADDING.MD,
  },
});

export default styles;
