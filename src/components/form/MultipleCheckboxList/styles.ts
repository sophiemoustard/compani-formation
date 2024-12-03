import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../../styles/metrics';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREY } from '../../../styles/colors';

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: PADDING.LG,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[900],
    margin: MARGIN.SM,
    flex: 1,
  },
  icon: {
    marginRight: MARGIN.SM,
  },
  container: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  requiredCaption: {
    color: 'red',
  },
  errorIcon: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupIcon: {
    marginRight: 5,
    fontSize: 14,
    color: '#9E9E9E',
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  option: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    marginBottom: 5,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 14,
    color: '#424242',
  },
  selectedOption: {
    color: '#0288D1',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
  },
});

export default styles;
