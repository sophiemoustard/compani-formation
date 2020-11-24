import { StyleSheet } from 'react-native';
import { WHITE, MODAL_BACKDROP_GREY } from '../../styles/colors';
import { PADDING, MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: MODAL_BACKDROP_GREY,
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: WHITE,
    padding: PADDING.LG,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.MD,
  },
  button: {
    width: '100%',
  },
});

export default styles;
