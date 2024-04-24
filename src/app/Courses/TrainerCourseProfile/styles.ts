import { StyleSheet } from 'react-native';
import { MARGIN } from '@/styles/metrics';

const styles = StyleSheet.create({
  buttonsContainer: {
    marginVertical: MARGIN.LG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminButton: {
    width: '95%',
    marginBottom: 24,
  },
});

export default styles;
