import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, PADDING, BORDER_WIDTH, ICON, CALENDAR_HEADER_HEIGHT } from '../../styles/metrics';
import { PINK, WHITE, GREY, GREEN } from '../../styles/colors';
import { NUNITO_SEMI, NUNITO_REGULAR } from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    minWidth: 50,
    position: 'relative',
  },
  dateContainer: {
    height: 72,
    // Do not merge the borderWidths params, avoid an unwanted line in android
    borderTopWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderColor: PINK[500],
    alignItems: 'center',
    paddingBottom: PADDING.SM,
    overflow: 'hidden',
  },
  dayOfWeek: {
    backgroundColor: PINK[500],
    width: '100%',
    height: CALENDAR_HEADER_HEIGHT,
    ...NUNITO_SEMI.XS,
    color: WHITE,
    textAlign: 'center',
  },
  dayOfMonth: {
    ...NUNITO_REGULAR.XL,
    height: 32,
    paddingHorizontal: PADDING.SM,
  },
  month: {
    ...NUNITO_SEMI.SM,
    color: PINK[500],
    paddingHorizontal: PADDING.SM,
  },
  toPlan: {
    ...NUNITO_REGULAR.XXL,
  },
  datesLengthContainer: {
    position: 'absolute',
    bottom: -6,
    right: -10,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    borderColor: PINK[500],
    backgroundColor: WHITE,
  },
  datesLength: {
    ...NUNITO_REGULAR.SM,
    color: PINK[500],
    paddingHorizontal: PADDING.SM,
  },
  finishedContainer: {
    position: 'absolute',
    bottom: -6,
    right: -16,
    width: ICON.XL,
    height: ICON.XL,
    backgroundColor: GREEN[600],
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 4 * BORDER_WIDTH,
    borderColor: GREEN[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: -6,
    right: -12,
    width: ICON.MD,
    height: ICON.MD,
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    width: ICON.XS,
    height: ICON.XS,
  },
  shadow: {
    backgroundColor: GREY[200],
    borderRadius: BORDER_RADIUS.SM,
  },
  manyDatesShadow: {
    backgroundColor: GREY[200],
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: BORDER_WIDTH,
    borderColor: PINK[500],
    opacity: 0.6,
    zIndex: -2,
  },
  shadowHeader: {
    backgroundColor: PINK[500],
    opacity: 0.6,
    width: '100%',
    height: CALENDAR_HEADER_HEIGHT,
    position: 'absolute',
    borderTopLeftRadius: BORDER_RADIUS.SM,
    borderTopRightRadius: BORDER_RADIUS.SM,
  },
});

export default styles;
