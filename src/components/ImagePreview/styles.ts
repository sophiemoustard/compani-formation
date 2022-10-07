import { StyleSheet } from 'react-native';
import { BLACK, RED } from '../../styles/colors';
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
