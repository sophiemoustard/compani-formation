import { StyleSheet } from 'react-native';
import { GREY } from '../../styles/colors';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY[200],
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    ...FIRA_SANS_REGULAR.XXL,
  },
  italicText: {
    fontStyle: 'italic',
    ...FIRA_SANS_REGULAR.XXL,
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  text: {
    ...FIRA_SANS_REGULAR.XXL,
    marginBottom: MARGIN.XL,
  },
});

export default styles;
