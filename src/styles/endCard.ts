import { StyleSheet } from 'react-native';
import { YELLOW, GREY } from './colors';
import { MARGIN } from './metrics';
import { FIRA_SANS_BLACK } from './fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YELLOW[100],
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  text: {
    ...FIRA_SANS_BLACK.XL,
    color: GREY[800],
    marginVertical: MARGIN.XXL,
  },
  image: {
    height: 160,
    resizeMode: 'contain',
    marginTop: MARGIN.XL,
  },
  elipse: {
    height: 320,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    marginBottom: MARGIN.XL,
    marginHorizontal: MARGIN.XL,
  },
});

export default styles;
