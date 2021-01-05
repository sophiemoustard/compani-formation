import { StyleSheet } from 'react-native';
import { WHITE, GREY } from '../../../styles/colors';
import { MAIN_MARGIN_LEFT, MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_BLACK, NUNITO_SEMI } from '../../../styles/fonts';

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
    marginTop: MARGIN.XL,
    marginBottom: MARGIN.MD,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: MARGIN.XL,
  },
  progressBarText: {
    ...NUNITO_SEMI.XS,
    color: GREY[600],
  },
});

export default styles;
