import { StyleSheet } from 'react-native';
import { GREY } from '../../styles/colors';
import { MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_REGULAR, FIRA_SANS_BOLD, FIRA_SANS_ITALIC } from '../../styles/fonts';

const styles = level => StyleSheet.create({
  container: {
    backgroundColor: GREY[100],
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  boldText: {
    fontWeight: 'bold',
    ...FIRA_SANS_BOLD.MD,
  },
  italicText: {
    fontStyle: 'italic',
    ...FIRA_SANS_ITALIC.MD,
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    ...FIRA_SANS_REGULAR.MD,
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
  },
  listContainer: {
    width: '100%',
  },
  listText: {
    paddingLeft: PADDING.SM + level * PADDING.SM,
    ...FIRA_SANS_REGULAR.MD,
  },
  listIndex: {
    fontWeight: 'bold',
    ...FIRA_SANS_REGULAR.MD,
  },
});

export default styles;
