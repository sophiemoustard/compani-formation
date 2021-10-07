import { StyleSheet } from 'react-native';
import { MARGIN } from '../../../../styles/metrics';

const styles = (imgHeight: number, isMediaLoading: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MARGIN.MD,
  },
  media: {
    height: imgHeight,
    marginBottom: MARGIN.LG,
    display: !isMediaLoading ? 'flex' : 'none',
  },
});

export default styles;
