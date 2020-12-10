import { StyleSheet } from 'react-native';
import { FIRA_SANS_BLACK } from '../../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT, MARGIN } from '../../../styles/metrics';

const styles = ({ borderColor, backgroundColor, color }) => StyleSheet.create({
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
    backgroundColor,
    borderColor,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: MARGIN.LG,
    marginBottom: MARGIN.MD,

  },
  text: {
    ...FIRA_SANS_BLACK.MD,
    marginHorizontal: MARGIN.SM,
    color,
  },
});

export default styles;
