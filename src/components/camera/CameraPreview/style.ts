import { StyleSheet } from 'react-native';
import { GREY, PINK, WHITE } from '../../../styles/colors';
import { FIRA_SANS_BLACK } from '../../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT, MARGIN } from '../../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  photo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    marginTop: MARGIN.LG,
  },
  button: {
    minWidth: 100,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: MARGIN.LG,
    marginBottom: MARGIN.MD,
  },
  retakePictureButton: {
    backgroundColor: WHITE,
    borderColor: GREY[600],
  },
  SavePictureButton: {
    backgroundColor: PINK[500],
    borderColor: PINK[500],
  },
  text: {
    ...FIRA_SANS_BLACK.MD,
    marginHorizontal: MARGIN.SM,
  },
  retakePictureText: {
    color: GREY[600],
  },
  savePictureText: {
    color: WHITE,
  },
});

export default styles;
