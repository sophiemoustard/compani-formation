import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BORDER_WIDTH, MAIN_MARGIN_LEFT, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { TRANSPARENT_GREY, WHITE } from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: MAIN_MARGIN_LEFT,
  },
  separator: {
    marginRight: MARGIN.SM,
  },
  countContainer: {
    marginBottom: MARGIN.LG,
    marginTop: MARGIN.SM,
    marginLeft: MAIN_MARGIN_LEFT,
    paddingVertical: PADDING.XS,
    paddingHorizontal: PADDING.SM,
    borderRadius: BORDER_RADIUS.XS,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginLeft: MAIN_MARGIN_LEFT,
  },
  text: {
    ...FIRA_SANS_BOLD.MD,
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    right: -32,
    bottom: 16,
  },
  courseContainer: {
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: BORDER_WIDTH,
    borderColor: TRANSPARENT_GREY,
    overflow: 'hidden',
    backgroundColor: WHITE,
    marginHorizontal: MAIN_MARGIN_LEFT,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 176,
    padding: PADDING.LG,
  },
});

export default styles;
