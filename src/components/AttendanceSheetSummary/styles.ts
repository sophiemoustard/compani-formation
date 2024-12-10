import { StyleSheet } from 'react-native';
import { INPUT_HEIGHT, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { GREY } from '../../styles/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  header: {
    paddingTop: PADDING.LG,
    paddingHorizontal: PADDING.LG,
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flexGrow: 1,
    marginHorizontal: MARGIN.LG,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginVertical: MARGIN.LG,
  },
  checkboxContainer: {
    position: 'absolute',
    marginHorizontal: MARGIN.MD,
    bottom: 2 * INPUT_HEIGHT,
    left: 0,
    right: 0,
  },
  button: {
    marginHorizontal: MARGIN.MD,
    marginBottom: MARGIN.MD,
  },
  image: {
    height: '40%',
    resizeMode: 'center',
  },
});

export default styles;
