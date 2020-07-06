import { StyleSheet } from 'react-native';
import variables from './variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: variables.NEUTRAL_BACKGROUND_COLOR,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: variables.MAIN_MARGIN_LEFT,
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: variables.MAIN_MARGIN_LEFT,
  }
});
