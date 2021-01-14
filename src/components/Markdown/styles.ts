import { StyleSheet } from 'react-native';
import { GREY } from '../../styles/colors';
import { MARGIN, PADDING } from '../../styles/metrics';

const styles = level => StyleSheet.create({
  container: {
    backgroundColor: GREY[200],
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  text: {
    marginBottom: MARGIN.XL,
  },
  bulletContainer: {
    width: '100%',
  },
  bulletText: {
    paddingLeft: level * PADDING.SM,
  },
  listIndex: {
    fontWeight: 'bold',
  },
});

export default styles;
