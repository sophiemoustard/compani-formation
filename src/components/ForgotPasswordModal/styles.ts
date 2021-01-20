import { StyleSheet } from 'react-native';
import { GREY, MODAL_BACKDROP_GREY, WHITE } from '../../styles/colors';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: MODAL_BACKDROP_GREY,
  },
  modalContent: {
    display: 'flex',
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.MD,
    width: '100%',
    height: '80%',
    padding: PADDING.LG,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: MARGIN.SM,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    color: GREY[800],
    textAlign: 'center',
    marginVertical: MARGIN.LG,
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[800],
    textAlign: 'center',
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.XXXL,
  },
  loading: {
    paddingHorizontal: PADDING.SM,
    position: 'absolute',
    right: 40,
  },
  goBack: {
    alignSelf: 'flex-end',
  },
});

export default styles;
