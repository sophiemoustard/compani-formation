import { StyleSheet } from 'react-native';
import { GREY, MODAL_BACKDROP_GREY, ORANGE, WHITE } from '../../styles/colors';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR, FIRA_SANS_ITALIC } from '../../styles/fonts';

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: MODAL_BACKDROP_GREY,
  },
  modalContent: {
    display: 'flex',
    backgroundColor: WHITE,
    borderTopLeftRadius: BORDER_RADIUS.MD,
    borderTopRightRadius: BORDER_RADIUS.MD,
    width: '100%',
    height: '85%',
    padding: PADDING.LG,
  },
  button: {
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.SM,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    color: GREY[800],
    textAlign: 'center',
    marginVertical: MARGIN.LG,
  },
  beforeCodeSentText: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[800],
    textAlign: 'center',
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.XXL,
  },
  afterCodeSentText: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[800],
    textAlign: 'center',
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.LG,
  },
  recipient: {
    ...FIRA_SANS_BOLD.MD,
    color: GREY[800],
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.XL,
  },
  input: {
    ...FIRA_SANS_REGULAR.XXL,
    marginHorizontal: MARGIN.XXS,
  },
  goBack: {
    alignSelf: 'flex-end',
  },
  unvalid: {
    ...FIRA_SANS_ITALIC.SM,
    color: ORANGE[600],
    marginHorizontal: MARGIN.SM,
  },
});

export default styles;
