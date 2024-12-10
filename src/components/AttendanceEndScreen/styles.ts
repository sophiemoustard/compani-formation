import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BLACK, FIRA_SANS_BOLD } from '../../styles/fonts';
import { GREY, PINK } from '../../styles/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  container: {
    flexGrow: 1,
    marginHorizontal: MARGIN.LG,
    justifyContent: 'space-between',
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginVertical: MARGIN.LG,
    textAlign: 'center',
  },
  text: {
    ...FIRA_SANS_BLACK.MD,
    color: PINK[600],
    marginVertical: MARGIN.LG,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: MARGIN.MD,
    marginBottom: MARGIN.MD,
  },
  image: {
    height: 160,
    resizeMode: 'contain',
    marginTop: MARGIN.XL,
  },
  icon: {
    alignContent: 'center',
    marginHorizontal: MARGIN.MD,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperContainer: {
    justifyContent: 'flex-start',
  },
  lowerContainer: {
    justifyContent: 'flex-end',
  },
});

export default styles;
