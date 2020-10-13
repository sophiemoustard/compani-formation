import { StyleSheet } from 'react-native';
import { WHITE } from '../../styles/colors';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BLACK, FIRA_SANS_REGULAR } from '../../styles/fonts';

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  inner: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    ...FIRA_SANS_BLACK.LG,
    textAlign: 'center',
    color: WHITE,
    marginBottom: MARGIN.XL,
  },
  input: {
    marginVertical: MARGIN.SM,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: MARGIN.SM,
  },
  forgotPasswordText: {
    ...FIRA_SANS_REGULAR.SM,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: WHITE,
  },
  button: {
    marginTop: MARGIN.XL,
  },
});

export default styles;
