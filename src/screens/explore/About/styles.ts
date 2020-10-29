import { StyleSheet } from 'react-native';
import { GREY, PINK, WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_BLACK, FIRA_SANS_REGULAR, NUNITO_SEMI } from '../../../styles/fonts';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    margin: MARGIN.MD,
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: PINK[600],
    height: 200,
  },
  titleContainer: {
    marginTop: MARGIN.LG,
  },
  aboutTitle: {
    ...NUNITO_SEMI.MD,
    color: PINK[200],
  },
  programTitle: {
    ...FIRA_SANS_BLACK.XL,
    color: WHITE,
  },
  imageContainer: {
    marginVertical: MARGIN.MD,
    height: 160,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: BORDER_RADIUS.MD,
  },
  description: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[800],
  },
  footer: {
    margin: MARGIN.XL,
  },
});

export default styles;
