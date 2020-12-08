import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, MAIN_MARGIN_LEFT, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';

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
});

export default styles;
