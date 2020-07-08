import { StyleSheet } from 'react-native';
import { NEUTRAL_BACKGROUND_COLOR, MAIN_MARGIN_LEFT } from './variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NEUTRAL_BACKGROUND_COLOR,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: MAIN_MARGIN_LEFT,
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: MAIN_MARGIN_LEFT,
  }
});
