import { StyleSheet } from 'react-native';
import { WHITE, GREY } from '../../styles/colors';
import { MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BLACK, FIRA_SANS_REGULAR } from '../../styles/fonts';

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
    padding: PADDING.SM,
    zIndex: 100,
  },
  forgotPasswordText: {
    ...FIRA_SANS_REGULAR.SM,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: WHITE,
    textShadowColor: GREY[800],
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 1 },
  },
  button: {
    marginTop: MARGIN.XL,
    marginBottom: MARGIN.SM,
  },
});

export default styles;
