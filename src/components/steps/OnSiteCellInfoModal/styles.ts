import { StyleSheet } from 'react-native';
import { BORDER_WIDTH, MARGIN } from '../../../styles/metrics';
import { GREY, PINK } from '../../../styles/colors';
import { NUNITO_SEMI, FIRA_SANS_REGULAR, FIRA_SANS_BOLD } from '../../../styles/fonts';

export default StyleSheet.create({
  stepInfoSeparator: {
    marginBottom: MARGIN.MD,
  },
  separator: {
    height: 16,
    borderLeftWidth: BORDER_WIDTH,
    borderLeftColor: GREY[300],
    marginHorizontal: MARGIN.SM,
    alignSelf: 'center',
  },
  date: {
    ...NUNITO_SEMI.XS,
    color: GREY[600],
    textTransform: 'uppercase',
  },
  address: {
    ...FIRA_SANS_REGULAR.MD,
    color: PINK[600],
    textDecorationLine: 'underline',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: MARGIN.XL,
  },
  title: {
    ...FIRA_SANS_BOLD.MD,
    flex: 1,
  },
  closeButton: {
    alignItems: 'flex-end',
  },
});
