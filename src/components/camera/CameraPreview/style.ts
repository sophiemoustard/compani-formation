import { StyleSheet } from 'react-native';
import { PINK, WHITE } from '../../../styles/colors';
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
  },
  view1: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: MARGIN.LG,
  },
  button: {
    minWidth: 100,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PINK[500],
    borderColor: PINK[500],
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    ...FIRA_SANS_BLACK.MD,
    marginHorizontal: MARGIN.SM,
    color: WHITE,
  },
});

export default styles;
