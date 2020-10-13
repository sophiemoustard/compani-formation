import { StyleSheet } from 'react-native';
import { PINK, WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MAIN_MARGIN_LEFT, MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_BLACK, NUNITO_SEMI } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: PINK[600],
    height: 200,
    width: '100%',
    position: 'absolute',
  },
  arrow: {
    margin: MAIN_MARGIN_LEFT,
  },
  titleContainer: {
    marginHorizontal: MAIN_MARGIN_LEFT,
  },
  subTitle: {
    ...NUNITO_SEMI.MD,
    color: PINK[200],
  },
  title: {
    ...FIRA_SANS_BLACK.XL,
    color: WHITE,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: MARGIN.MD,
    width: '100%',
  },
  image: {
    height: 160,
    width: '100%',
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
  },
});

export default styles;
