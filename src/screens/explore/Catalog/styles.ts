import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { MAIN_MARGIN_LEFT, MARGIN } from '../../../styles/metrics';

const styles = (count = { color: '', background: '' }) => StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  programsCount: {
    ...FIRA_SANS_REGULAR.SM,
    color: count.color || undefined,
    backgroundColor: count.background || undefined,
  },
  programContainer: {
    paddingHorizontal: MAIN_MARGIN_LEFT,
  },
  separator: {
    marginRight: MARGIN.SM,
  },
  sectionContainer: {
    marginVertical: MARGIN.LG,
  },
  rightBackground: {
    resizeMode: 'contain',
    position: 'absolute',
    right: '-70%',
    top: -32,
  },
  leftBackground: {
    resizeMode: 'contain',
    position: 'absolute',
    left: '-70%',
    top: -32,
  },
  elipse: {
    width: '100%',
    position: 'absolute',
    bottom: -120,
    resizeMode: 'contain',
  },
  fellow: {
    width: 152,
    height: 168,
    resizeMode: 'contain',
    marginVertical: MARGIN.XL,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
});

export default styles;
