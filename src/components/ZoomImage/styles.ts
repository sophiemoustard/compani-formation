import { StyleSheet } from 'react-native';
import { GREY } from '../../styles/colors';
import { MARGIN, PADDING } from '../../styles/metrics';

const styles = (mediaHeight: number) => StyleSheet.create({
  goBack: {
    alignSelf: 'flex-end',
  },
  media: {
    height: mediaHeight,
    marginBottom: MARGIN.LG,
  },
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexGrow: 1,
    backgroundColor: GREY[100],
    zIndex: 100,
    padding: PADDING.LG,
  },
  content: {
    flexGrow: 1,
    backgroundColor: GREY[100],
    justifyContent: 'center',
  },
});

export default styles;
