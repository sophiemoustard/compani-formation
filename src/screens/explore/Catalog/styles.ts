import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { MAIN_MARGIN_LEFT, MARGIN } from '../../../styles/metrics';
import { YELLOW } from '../../../styles/colors';

export default StyleSheet.create({
  programsCount: {
    ...FIRA_SANS_REGULAR.SM,
    color: YELLOW[900],
    backgroundColor: YELLOW[200],
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
  background: {
    resizeMode: 'contain',
    position: 'absolute',
    left: -176,
    top: -32,
  },
});
