import { StyleSheet } from 'react-native';
import { BLACK, WHITE } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { MARGIN, PADDING } from '../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLACK,
    flexGrow: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  pdfContainer: {
    flex: 1,
    marginTop: MARGIN.XXL,
  },
  pdfContent: {
    backgroundColor: BLACK,
  },
  linkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: MARGIN.LG,
  },
  linkContent: {
    ...FIRA_SANS_REGULAR.MD,
    color: WHITE,
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    marginTop: MARGIN.LG,
  },
  button: {
    marginHorizontal: MARGIN.LG,
    marginBottom: MARGIN.MD,
  },
  goBack: {
    position: 'absolute',
    alignItems: 'flex-start',
    margin: MARGIN.MD,
    paddingTop: PADDING.MD,
  },
});

export default styles;
