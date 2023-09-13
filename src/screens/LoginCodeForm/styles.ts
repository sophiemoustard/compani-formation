import { StyleSheet } from 'react-native';
import { GREY, PINK, WHITE } from '../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    marginHorizontal: MARGIN.LG,
  },
  goBack: {
    marginVertical: MARGIN.MD,
  },
  codeContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: PADDING.MD,
  },
  code: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: MARGIN.MD,
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[600],
  },
  number: {
    ...FIRA_SANS_REGULAR.XXL,
    marginHorizontal: MARGIN.XXS,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    ...FIRA_SANS_REGULAR.SM,
    marginBottom: MARGIN.XS,
    color: GREY[600],
  },
  required: {
    ...FIRA_SANS_REGULAR.SM,
    color: PINK[500],
    paddingHorizontal: PADDING.SM,
  },
});
