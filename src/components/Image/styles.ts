import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';

const styles = (imgHeight: number, isMediaLoading: boolean) => StyleSheet.create({
  media: {
    height: imgHeight,
    marginBottom: MARGIN.LG,
    display: !isMediaLoading ? 'flex' : 'none',
  },
  spinnerContainer: {
    alignItems: 'center',
  },
});

export default styles;
