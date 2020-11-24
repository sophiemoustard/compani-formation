import { StyleSheet } from 'react-native';
import { MARGIN } from '../../../../styles/metrics';

const styles = (imgHeight: number) => StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MARGIN.MD,
  },
  media: {
    height: imgHeight,
    marginBottom: MARGIN.LG,
  },
});

export default styles;
