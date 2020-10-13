import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../styles/metrics';
import { GREEN } from '../../styles/colors';

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: MARGIN.XXL,
  },
  image: {
    width: 160,
    height: 30,
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    paddingHorizontal: PADDING.XL,
    justifyContent: 'center',
  },
  input: {
    marginVertical: MARGIN.SM,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  success: {
    color: GREEN[500],
    marginBottom: MARGIN.SM,
  },
});

export default styles;
