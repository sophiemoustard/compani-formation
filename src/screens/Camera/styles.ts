import { StyleSheet } from 'react-native';
import { BLACK } from '../../styles/colors';
import { MARGIN, PADDING } from '../../styles/metrics';

const styles = (insetTop: number) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BLACK,
  },
  goBack: {
    position: 'absolute',
    alignItems: 'flex-start',
    margin: MARGIN.MD,
    paddingTop: Math.max(insetTop, PADDING.MD),
  },
});

export default styles;
