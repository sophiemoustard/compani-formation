import { StyleSheet } from 'react-native';
import { GREY, PINK } from '../../../styles/colors';
import { MARGIN, BUTTON_HEIGHT, BORDER_WIDTH, BORDER_RADIUS, PADDING } from '../../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../../styles/fonts';

const styles = StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.MD,

  },
  contentText: {
    ...FIRA_SANS_REGULAR.MD,
    marginBottom: MARGIN.XL,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    color: PINK[500],
  },
  button: {
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.XL,
    padding: PADDING.LG,
    borderColor: GREY[300],
    marginBottom: MARGIN.MD,
  },
  companyName: {
    ...FIRA_SANS_BOLD.LG,
    color: GREY[600],
    marginHorizontal: MARGIN.MD,
  },
});

export default styles;
